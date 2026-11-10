from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView as SimpleJWTTokenObtainPairView,
    TokenRefreshView as SimpleJWTTokenRefreshView,
)

from .serializers import CurrentUserSerializer, TokenRefreshSerializer


class AuthResponseMixin:
    """Apply the API contract's envelopes to authentication responses."""

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(
            request, response, *args, **kwargs,
        )
        if response.exception:
            details = response.data.copy()
            detail = details.pop('detail', None)
            code = details.pop(
                'code', getattr(detail, 'code', 'validation_error'),
            )
            response.data = {
                'error': {
                    'code': str(code).upper(),
                    'message': (
                        str(detail) if detail
                        else 'The submitted data is invalid.'
                    ),
                    'details': details,
                },
            }
        else:
            response.data = {'data': response.data, 'meta': {}}
        return response


class TokenObtainPairView(AuthResponseMixin, SimpleJWTTokenObtainPairView):
    pass


class TokenRefreshView(AuthResponseMixin, SimpleJWTTokenRefreshView):
    serializer_class = TokenRefreshSerializer


class CurrentUserView(AuthResponseMixin, RetrieveAPIView):
    serializer_class = CurrentUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
