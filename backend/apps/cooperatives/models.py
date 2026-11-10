import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class Cooperative(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=255, blank=True)
    contact_information = models.JSONField()
    address = models.TextField()
    # The contract does not yet define lifecycle values or an initial status.
    status = models.CharField(max_length=50, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=~models.Q(status=''),
                name='cooperatives_cooperative_status_required',
            ),
        ]

    def clean(self):
        super().clean()
        if not self.status:
            raise ValidationError({
                'status': 'The system must assign a cooperative status.',
            })

    def __str__(self):
        return self.name


class CooperativeAccess(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='cooperative_accesses',
    )
    cooperative = models.ForeignKey(
        'Cooperative',
        on_delete=models.PROTECT,
        related_name='accesses',
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'cooperative'],
                name='cooperatives_access_user_cooperative_unique',
            ),
        ]


class CooperativeBankAccount(models.Model):
    APPROVED = 'approved'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cooperative = models.ForeignKey(
        'Cooperative',
        on_delete=models.PROTECT,
        related_name='bank_accounts',
    )
    account_details = models.JSONField()
    # The contract establishes "approved" but leaves other states undefined.
    submission_status = models.CharField(max_length=50, editable=False)
    submitted_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True, editable=False)
    approved_at = models.DateTimeField(null=True, blank=True, editable=False)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=~models.Q(submission_status=''),
                name='cooperatives_bank_submission_status_required',
            ),
        ]

    def clean(self):
        super().clean()
        if not self.submission_status:
            raise ValidationError({
                'submission_status': 'The system must assign a status.',
            })

    def get_payout_account_details(self):
        """Return bank details only after system approval."""
        if self.submission_status != self.APPROVED:
            raise ValidationError(
                'Only approved bank account details may be used for payouts.'
            )
        return self.account_details


class CooperativeMembership(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    farmer = models.ForeignKey(
        'farmers.Farmer',
        on_delete=models.PROTECT,
        related_name='cooperative_memberships',
    )
    cooperative = models.ForeignKey(
        'cooperatives.Cooperative',
        on_delete=models.PROTECT,
        related_name='memberships',
    )
    membership_proof = models.JSONField()
    # The contract does not yet define lifecycle values or initial statuses.
    confirmation_status = models.CharField(max_length=50, editable=False)
    verification_status = models.CharField(max_length=50, editable=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=~models.Q(confirmation_status=''),
                name='cooperatives_membership_confirmation_status_required',
            ),
            models.CheckConstraint(
                condition=~models.Q(verification_status=''),
                name='cooperatives_membership_verification_status_required',
            ),
        ]

    def clean(self):
        super().clean()
        errors = {}
        for field in ('confirmation_status', 'verification_status'):
            if not getattr(self, field):
                errors[field] = 'The system must assign a membership status.'
        if errors:
            raise ValidationError(errors)
