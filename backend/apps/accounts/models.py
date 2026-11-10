import uuid

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    class AccountType(models.TextChoices):
        FARMER = 'farmer', 'Farmer'
        COOPERATIVE = 'cooperative', 'Cooperative'
        STAFF = 'staff', 'Staff'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    account_type = models.CharField(max_length=11, choices=AccountType.choices)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['account_type']

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=models.Q(account_type__in=['farmer', 'cooperative', 'staff']),
                name='accounts_user_account_type_valid',
            ),
        ]

    def __str__(self):
        return self.email
