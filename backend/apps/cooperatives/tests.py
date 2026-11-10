import uuid
from datetime import date, timedelta

from django.apps import apps
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.db.migrations.loader import MigrationLoader
from django.forms import modelform_factory
from django.test import SimpleTestCase
from django.utils import timezone

from apps.farmers.models import Farmer

from .models import (
    Cooperative,
    CooperativeAccess,
    CooperativeBankAccount,
    CooperativeMembership,
)


class CooperativeTests(SimpleTestCase):
    def setUp(self):
        self.cooperative = Cooperative(
            name='Rice growers cooperative',
            contact_information={'email': 'contact@example.com'},
            address='1 Rice Road',
            status='system-assigned',
        )

    def test_valid_cooperative_allows_omitted_registration_number(self):
        self.cooperative.full_clean(
            validate_unique=False, validate_constraints=False,
        )
        self.assertEqual(self.cooperative.registration_number, '')

    def test_required_profile_fields_reject_empty_values(self):
        for field, empty_values in (
            ('name', ('', None)),
            ('contact_information', (None, {}, [], '')),
            ('address', ('', None)),
        ):
            for value in empty_values:
                with self.subTest(field=field, value=value):
                    original = getattr(self.cooperative, field)
                    setattr(self.cooperative, field, value)
                    with self.assertRaises(ValidationError) as raised:
                        self.cooperative.full_clean(
                            validate_unique=False, validate_constraints=False,
                        )
                    self.assertIn(field, raised.exception.message_dict)
                    setattr(self.cooperative, field, original)

    def test_status_must_be_assigned_by_the_system(self):
        for value in ('', None):
            with self.subTest(value=value):
                self.cooperative.status = value
                with self.assertRaises(ValidationError) as raised:
                    self.cooperative.full_clean(
                        validate_unique=False, validate_constraints=False,
                    )
                self.assertIn('status', raised.exception.message_dict)

    def test_contact_information_rejects_non_json_data(self):
        self.cooperative.contact_information = {
            'phone_numbers': {'123', '456'},
        }
        with self.assertRaises(ValidationError) as raised:
            self.cooperative.full_clean(
                validate_unique=False, validate_constraints=False,
            )
        self.assertIn('contact_information', raised.exception.message_dict)


class CooperativeAccessTests(SimpleTestCase):
    def test_both_relationships_are_required(self):
        with self.assertRaises(ValidationError) as raised:
            CooperativeAccess().full_clean(
                validate_unique=False, validate_constraints=False,
            )
        self.assertEqual(
            set(raised.exception.message_dict), {'user', 'cooperative'},
        )

    def test_relationships_resolve_and_protect_parents(self):
        user = get_user_model()(
            email='contact@example.com', account_type='cooperative',
        )
        cooperative = Cooperative()
        access = CooperativeAccess(user=user, cooperative=cooperative)

        self.assertIs(access.user, user)
        self.assertIs(access.cooperative, cooperative)
        for field_name, target in (
            ('user', get_user_model()),
            ('cooperative', Cooperative),
        ):
            with self.subTest(field=field_name):
                field = CooperativeAccess._meta.get_field(field_name)
                self.assertIs(field.remote_field.model, target)
                self.assertIs(field.remote_field.on_delete, models.PROTECT)

    def test_access_uniqueness_is_scoped_to_the_user_cooperative_pair(self):
        constraint = next(
            constraint for constraint in CooperativeAccess._meta.constraints
            if isinstance(constraint, models.UniqueConstraint)
        )
        self.assertEqual(constraint.fields, ('user', 'cooperative'))


class CooperativeBankAccountTests(SimpleTestCase):
    def setUp(self):
        self.account = CooperativeBankAccount(
            cooperative=Cooperative(),
            account_details={
                'bank_name': 'Example bank',
                'account_number': '1234567890',
            },
            submission_status='system-assigned',
        )

    def validate_account(self):
        # Foreign-key existence and constraints need PostgreSQL coverage.
        self.account.full_clean(
            exclude=['cooperative'],
            validate_unique=False,
            validate_constraints=False,
        )

    def test_review_timestamps_are_optional(self):
        self.validate_account()
        self.assertIsNone(self.account.reviewed_at)
        self.assertIsNone(self.account.approved_at)

    def test_cooperative_is_required(self):
        self.account.cooperative = None
        with self.assertRaises(ValidationError) as raised:
            self.account.full_clean(
                validate_unique=False, validate_constraints=False,
            )
        self.assertIn('cooperative', raised.exception.message_dict)

    def test_account_details_are_required(self):
        for value in (None, {}, [], ''):
            with self.subTest(value=value):
                self.account.account_details = value
                with self.assertRaises(ValidationError) as raised:
                    self.validate_account()
                self.assertIn(
                    'account_details', raised.exception.message_dict,
                )

    def test_account_details_reject_non_json_data(self):
        self.account.account_details = {'account_number': object()}
        with self.assertRaises(ValidationError) as raised:
            self.validate_account()
        self.assertIn('account_details', raised.exception.message_dict)

    def test_submission_status_must_be_assigned_by_the_system(self):
        for value in ('', None):
            with self.subTest(value=value):
                self.account.submission_status = value
                with self.assertRaises(ValidationError) as raised:
                    self.validate_account()
                self.assertIn(
                    'submission_status', raised.exception.message_dict,
                )

    def test_unapproved_details_cannot_be_used_for_payouts(self):
        for status in (None, '', 'system-assigned', 'APPROVED'):
            with self.subTest(status=status):
                self.account.submission_status = status
                with self.assertRaisesMessage(
                    ValidationError, 'Only approved',
                ):
                    self.account.get_payout_account_details()

    def test_approval_timestamp_alone_does_not_authorize_payouts(self):
        self.account.approved_at = timezone.now()
        with self.assertRaisesMessage(ValidationError, 'Only approved'):
            self.account.get_payout_account_details()

    def test_approved_details_can_be_used_without_optional_timestamps(self):
        self.account.submission_status = CooperativeBankAccount.APPROVED
        self.validate_account()
        self.assertEqual(
            self.account.get_payout_account_details(),
            self.account.account_details,
        )

    def test_details_become_unusable_when_status_is_no_longer_approved(self):
        self.account.submission_status = CooperativeBankAccount.APPROVED
        self.account.approved_at = timezone.now()
        self.account.get_payout_account_details()
        self.account.submission_status = 'system-assigned'
        with self.assertRaisesMessage(ValidationError, 'Only approved'):
            self.account.get_payout_account_details()


class CooperativeModelTests(SimpleTestCase):
    def test_models_are_registered_and_generate_distinct_uuids(self):
        for model in (Cooperative, CooperativeAccess, CooperativeBankAccount):
            with self.subTest(model=model.__name__):
                self.assertIs(
                    apps.get_model('cooperatives', model.__name__), model,
                )
                first, second = model(), model()
                self.assertIsInstance(first.pk, uuid.UUID)
                self.assertNotEqual(first.pk, second.pk)

    def test_model_forms_exclude_system_managed_fields(self):
        for model, expected_fields in (
            (Cooperative, {
                'name', 'registration_number', 'contact_information', 'address',
            }),
            (CooperativeAccess, {'user', 'cooperative'}),
            (CooperativeBankAccount, {'cooperative', 'account_details'}),
        ):
            with self.subTest(model=model.__name__):
                form = modelform_factory(model, fields='__all__')
                self.assertEqual(set(form.base_fields), expected_fields)

    def test_creation_timestamps_are_generated_and_preserved_on_update(self):
        for instance, field_name in (
            (Cooperative(), 'created_at'),
            (CooperativeBankAccount(), 'submitted_at'),
        ):
            with self.subTest(field=field_name):
                field = instance._meta.get_field(field_name)
                before = timezone.now()
                generated = field.pre_save(instance, add=True)
                self.assertGreaterEqual(generated, before)
                self.assertLessEqual(generated, timezone.now())
                self.assertTrue(timezone.is_aware(generated))
                self.assertEqual(
                    field.pre_save(instance, add=False), generated,
                )


class CooperativeMembershipTests(SimpleTestCase):
    def setUp(self):
        self.farmer = Farmer()
        self.cooperative = Cooperative()
        self.membership = CooperativeMembership(
            farmer=self.farmer,
            cooperative=self.cooperative,
            membership_proof={
                'document': {'reference': 'example-membership-001'},
                'notes': ['Example supporting information'],
            },
            # Test values only; the contract has no defined status choices.
            confirmation_status='system-assigned',
            verification_status='system-assigned',
        )

    def validate_membership(self):
        # Relationship existence and DB enforcement need PostgreSQL coverage.
        self.membership.full_clean(
            exclude=['farmer', 'cooperative'],
            validate_unique=False,
            validate_constraints=False,
        )

    def test_valid_membership_can_be_constructed_and_validated(self):
        self.validate_membership()
        self.assertEqual(self.membership.farmer_id, self.farmer.pk)
        self.assertEqual(self.membership.cooperative_id, self.cooperative.pk)
        self.assertEqual(self.membership.membership_proof, {
            'document': {'reference': 'example-membership-001'},
            'notes': ['Example supporting information'],
        })

    def test_model_is_registered_and_generates_distinct_uuids(self):
        self.assertIs(
            apps.get_model('cooperatives', 'CooperativeMembership'),
            CooperativeMembership,
        )
        other = CooperativeMembership()
        for membership in (self.membership, other):
            self.assertIsInstance(membership.pk, uuid.UUID)
            self.assertEqual(membership.pk.version, 4)
        self.assertNotEqual(self.membership.pk, other.pk)

    def test_omitted_required_fields_are_rejected(self):
        with self.assertRaises(ValidationError) as raised:
            CooperativeMembership().full_clean(
                validate_unique=False, validate_constraints=False,
            )
        self.assertEqual(set(raised.exception.message_dict), {
            'farmer', 'cooperative', 'membership_proof',
            'confirmation_status', 'verification_status',
        })

    def test_each_relationship_is_required(self):
        for field, other in (
            ('farmer', 'cooperative'), ('cooperative', 'farmer'),
        ):
            with self.subTest(field=field):
                original = getattr(self.membership, field)
                setattr(self.membership, field, None)
                with self.assertRaises(ValidationError) as raised:
                    self.membership.full_clean(
                        exclude=[other],
                        validate_unique=False,
                        validate_constraints=False,
                    )
                self.assertEqual(set(raised.exception.message_dict), {field})
                setattr(self.membership, field, original)

    def test_relationships_resolve_to_existing_models_and_protect_parents(self):
        self.assertIs(self.membership.farmer, self.farmer)
        self.assertIs(self.membership.cooperative, self.cooperative)
        for name, target, reverse_name in (
            ('farmer', Farmer, 'cooperative_memberships'),
            ('cooperative', Cooperative, 'memberships'),
        ):
            with self.subTest(field=name):
                field = CooperativeMembership._meta.get_field(name)
                self.assertIs(field.remote_field.model, target)
                self.assertIs(field.remote_field.on_delete, models.PROTECT)
                self.assertEqual(field.remote_field.related_name, reverse_name)
                self.assertEqual(
                    field.deconstruct()[3]['to'], target._meta.label_lower,
                )
                self.assertFalse(field.null)
                self.assertFalse(field.unique)

    def test_membership_proof_is_required(self):
        for value in (None, {}, [], ''):
            with self.subTest(value=value):
                self.membership.membership_proof = value
                with self.assertRaises(ValidationError) as raised:
                    self.validate_membership()
                self.assertEqual(
                    set(raised.exception.message_dict), {'membership_proof'},
                )

    def test_membership_proof_rejects_non_json_data(self):
        self.membership.membership_proof = {'document': object()}
        with self.assertRaises(ValidationError) as raised:
            self.validate_membership()
        self.assertEqual(
            set(raised.exception.message_dict), {'membership_proof'},
        )

    def test_statuses_must_be_assigned_by_the_system(self):
        for field in ('confirmation_status', 'verification_status'):
            for value in ('', None):
                with self.subTest(field=field, value=value):
                    original = getattr(self.membership, field)
                    setattr(self.membership, field, value)
                    with self.assertRaises(ValidationError) as raised:
                        self.validate_membership()
                    self.assertEqual(set(raised.exception.message_dict), {field})
                    setattr(self.membership, field, original)

    def test_statuses_have_no_choices_or_defaults(self):
        for name in ('confirmation_status', 'verification_status'):
            with self.subTest(field=name):
                field = CooperativeMembership._meta.get_field(name)
                self.assertIsNone(field.choices)
                self.assertFalse(field.has_default())
                self.assertFalse(field.has_db_default())
                self.assertFalse(field.null)

    def test_only_declared_constraints_require_nonempty_statuses(self):
        # Inspect declarations without claiming database enforcement coverage.
        constraints = CooperativeMembership._meta.constraints
        self.assertEqual(len(constraints), 2)
        for constraint in constraints:
            self.assertIsInstance(constraint, models.CheckConstraint)
        self.assertCountEqual(
            [constraint.condition for constraint in constraints],
            [
                ~models.Q(confirmation_status=''),
                ~models.Q(verification_status=''),
            ],
        )
        self.assertFalse(CooperativeMembership._meta.unique_together)

    def test_start_date_is_generated_and_preserved_on_update(self):
        self.assertIsNone(self.membership.start_date)
        field = CooperativeMembership._meta.get_field('start_date')
        # Initial insertion replaces caller-supplied dates.
        self.membership.start_date = date(2000, 1, 1)
        before = date.today()
        generated = field.pre_save(self.membership, add=True)
        self.assertIs(type(generated), date)
        self.assertGreaterEqual(generated, before)
        self.assertLessEqual(generated, date.today())
        self.assertEqual(self.membership.start_date, generated)
        # Updating an older membership must not reset its date to today.
        historical_start = generated - timedelta(days=1)
        self.membership.start_date = historical_start
        self.assertEqual(
            field.pre_save(self.membership, add=False), historical_start,
        )

    def test_end_date_is_optional_and_accepts_a_date(self):
        self.assertIsNone(self.membership.end_date)
        self.validate_membership()
        self.membership.end_date = date(2026, 11, 30)
        self.validate_membership()
        self.assertEqual(self.membership.end_date, date(2026, 11, 30))
        self.assertTrue(
            CooperativeMembership._meta.get_field('end_date').null,
        )

    def test_end_date_rejects_invalid_dates(self):
        self.membership.end_date = '2026-02-30'
        with self.assertRaises(ValidationError) as raised:
            self.validate_membership()
        self.assertEqual(set(raised.exception.message_dict), {'end_date'})

    def test_model_forms_exclude_generated_and_system_managed_fields(self):
        form = modelform_factory(CooperativeMembership, fields='__all__')
        self.assertEqual(set(form.base_fields), {
            'farmer', 'cooperative', 'membership_proof', 'end_date',
        })

    def test_migration_depends_on_cooperative_and_farmer_initial_migrations(self):
        loader = MigrationLoader(None)
        key = ('cooperatives', '0002_cooperativemembership')
        parents = {node.key for node in loader.graph.node_map[key].parents}
        expected = {
            ('cooperatives', '0001_initial'), ('farmers', '0001_initial'),
        }
        self.assertEqual(parents, expected)
        plan = loader.graph.forwards_plan(key)
        for parent in expected:
            self.assertLess(plan.index(parent), plan.index(key))
        self.assertFalse(loader.detect_conflicts())
