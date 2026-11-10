import uuid

from django.apps import apps
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from django.forms import modelform_factory
from django.test import SimpleTestCase
from django.utils import timezone

from .models import Farmer


class FarmerTests(SimpleTestCase):
    def setUp(self):
        self.user = get_user_model()(
            email='farmer@example.com', account_type='farmer',
        )
        self.farmer = Farmer(
            user=self.user,
            first_name='Amina',
            last_name='Bello',
            phone_number='+234 08012345678',
            identity_information={
                'document': {'type': 'example', 'number': '001234'},
                'references': ['example-reference'],
            },
            # Test values only; the contract does not define status choices.
            registration_status='system-assigned',
            verification_status='system-assigned',
        )

    def validate_farmer(self):
        # User existence, uniqueness, and DB constraints need database coverage.
        self.farmer.full_clean(
            exclude=['user'],
            validate_unique=False,
            validate_constraints=False,
        )

    def test_valid_farmer_can_be_constructed_and_validated(self):
        self.validate_farmer()
        self.assertEqual(self.farmer.first_name, 'Amina')
        self.assertEqual(self.farmer.last_name, 'Bello')
        self.assertEqual(str(self.farmer), 'Amina Bello')
        self.assertEqual(self.farmer.user_id, self.user.pk)

    def test_model_is_registered_and_generates_distinct_uuids(self):
        self.assertIs(apps.get_model('farmers', 'Farmer'), Farmer)
        other = Farmer()
        for farmer in (self.farmer, other):
            self.assertIsInstance(farmer.pk, uuid.UUID)
            self.assertEqual(farmer.pk.version, 4)
        self.assertNotEqual(self.farmer.pk, other.pk)

    def test_omitted_required_fields_are_rejected(self):
        with self.assertRaises(ValidationError) as raised:
            Farmer().full_clean(
                validate_unique=False, validate_constraints=False,
            )
        self.assertEqual(set(raised.exception.message_dict), {
            'user', 'first_name', 'last_name', 'phone_number',
            'identity_information', 'registration_status', 'verification_status',
        })

    def test_required_profile_fields_reject_empty_values(self):
        for field, empty_values in (
            ('first_name', ('', None)),
            ('last_name', ('', None)),
            ('phone_number', ('', None)),
            ('identity_information', (None, {}, [], '')),
        ):
            for value in empty_values:
                with self.subTest(field=field, value=value):
                    original = getattr(self.farmer, field)
                    setattr(self.farmer, field, value)
                    with self.assertRaises(ValidationError) as raised:
                        self.validate_farmer()
                    self.assertIn(field, raised.exception.message_dict)
                    setattr(self.farmer, field, original)

    def test_user_is_required(self):
        self.farmer.user = None
        with self.assertRaises(ValidationError) as raised:
            self.farmer.full_clean(
                validate_unique=False, validate_constraints=False,
            )
        self.assertEqual(set(raised.exception.message_dict), {'user'})

    def test_relationship_uses_custom_user_and_protects_it(self):
        field = Farmer._meta.get_field('user')
        self.assertIs(field.remote_field.model, get_user_model())
        reference = field.deconstruct()[3]['to']
        self.assertEqual(reference, settings.AUTH_USER_MODEL.lower())
        self.assertEqual(reference.setting_name, 'AUTH_USER_MODEL')
        self.assertIs(field.remote_field.on_delete, models.PROTECT)
        self.assertFalse(field.null)
        self.assertIs(self.farmer.user, self.user)

    def test_user_relationship_is_unique_with_a_single_reverse_profile(self):
        field = Farmer._meta.get_field('user')
        self.assertIsInstance(field, models.OneToOneField)
        self.assertTrue(field.unique)
        self.assertIs(self.user.farmer, self.farmer)

    def test_user_relationship_rejects_non_user_objects(self):
        with self.assertRaises(ValueError):
            self.farmer.user = object()

    def test_phone_number_preserves_formatting_and_leading_zeroes(self):
        for number in ('08012345678', '+234 08012345678'):
            with self.subTest(number=number):
                self.farmer.phone_number = number
                self.validate_farmer()
                self.assertEqual(self.farmer.phone_number, number)

    def test_nested_identity_information_is_preserved(self):
        self.validate_farmer()
        self.assertEqual(self.farmer.identity_information, {
            'document': {'type': 'example', 'number': '001234'},
            'references': ['example-reference'],
        })

    def test_identity_information_rejects_non_json_data(self):
        self.farmer.identity_information = {'document': {'number': object()}}
        with self.assertRaises(ValidationError) as raised:
            self.validate_farmer()
        self.assertEqual(
            set(raised.exception.message_dict), {'identity_information'},
        )

    def test_statuses_must_be_assigned_by_the_system(self):
        for field in ('registration_status', 'verification_status'):
            for value in ('', None):
                with self.subTest(field=field, value=value):
                    original = getattr(self.farmer, field)
                    setattr(self.farmer, field, value)
                    with self.assertRaises(ValidationError) as raised:
                        self.validate_farmer()
                    self.assertEqual(set(raised.exception.message_dict), {field})
                    setattr(self.farmer, field, original)

    def test_statuses_have_no_default_or_choices(self):
        for name in ('registration_status', 'verification_status'):
            with self.subTest(field=name):
                field = Farmer._meta.get_field(name)
                self.assertFalse(field.has_default())
                self.assertFalse(field.has_db_default())
                self.assertIsNone(field.choices)
                self.assertFalse(field.null)

    def test_model_forms_exclude_generated_and_system_managed_fields(self):
        form = modelform_factory(Farmer, fields='__all__')
        self.assertEqual(set(form.base_fields), {
            'user', 'first_name', 'last_name', 'phone_number',
            'identity_information',
        })

    def test_created_at_is_generated_and_preserved_on_update(self):
        self.assertIsNone(self.farmer.created_at)
        field = Farmer._meta.get_field('created_at')
        before = timezone.now()
        generated = field.pre_save(self.farmer, add=True)
        self.assertGreaterEqual(generated, before)
        self.assertLessEqual(generated, timezone.now())
        self.assertTrue(timezone.is_aware(generated))
        self.assertEqual(self.farmer.created_at, generated)
        self.assertEqual(field.pre_save(self.farmer, add=False), generated)
