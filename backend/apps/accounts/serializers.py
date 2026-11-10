from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer as SimpleJWTTokenRefreshSerializer,
)


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'account_type', 'is_active', 'created_at')
        read_only_fields = fields


class TokenRefreshSerializer(SimpleJWTTokenRefreshSerializer):
    def validate(self, attrs):
        # Simple JWT 5.5.1 leaves a missing refresh-token user unhandled.
        try:
            return super().validate(attrs)
        except get_user_model().DoesNotExist as exc:
            raise AuthenticationFailed(
                self.error_messages['no_active_account'],
                code='no_active_account',
            ) from exc
