import uuid

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


class Farmer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='farmer',
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=50)
    identity_information = models.JSONField()
    # The contract does not yet define lifecycle values or initial statuses.
    registration_status = models.CharField(max_length=50, editable=False)
    verification_status = models.CharField(max_length=50, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=~models.Q(registration_status=''),
                name='farmers_farmer_registration_status_required',
            ),
            models.CheckConstraint(
                condition=~models.Q(verification_status=''),
                name='farmers_farmer_verification_status_required',
            ),
        ]

    def clean(self):
        super().clean()
        errors = {}
        for field in ('registration_status', 'verification_status'):
            if not getattr(self, field):
                errors[field] = 'The system must assign a farmer status.'
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
