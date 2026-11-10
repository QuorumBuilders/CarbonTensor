from django.contrib.auth import get_user_model
from rest_framework.permissions import BasePermission


class IsFarmer(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and user.account_type == get_user_model().AccountType.FARMER
        )


class IsCooperative(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and user.account_type == get_user_model().AccountType.COOPERATIVE
        )


class IsStaff(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and user.account_type == get_user_model().AccountType.STAFF
        )
