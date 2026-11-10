import uuid
from datetime import timedelta
from types import SimpleNamespace
from unittest.mock import patch

from django.contrib.auth.models import AnonymousUser
from django.test import SimpleTestCase, override_settings
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APISimpleTestCase
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .models import User
from .permissions import IsCooperative, IsFarmer, IsStaff


class UserManagerTests(SimpleTestCase):
    @patch.object(User, 'save', autospec=True)
    def test_create_user_normalizes_email_and_hashes_password(self, save):
        user = User.objects.create_user(
            'farmer@EXAMPLE.COM',
            'test-password-only',
            account_type=User.AccountType.FARMER,
        )

        self.assertEqual(user.email, 'farmer@example.com')
        self.assertIsInstance(user.pk, uuid.UUID)
        self.assertTrue(user.check_password('test-password-only'))
        self.assertNotEqual(user.password, 'test-password-only')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        save.assert_called_once_with(user, using=None)

    def test_create_user_requires_email(self):
        with self.assertRaisesMessage(ValueError, 'An email address is required.'):
            User.objects.create_user(
                '', 'test-password-only', account_type=User.AccountType.FARMER,
            )

    def test_create_user_requires_password(self):
        for password in (None, ''):
            with self.subTest(password=password):
                with self.assertRaisesMessage(ValueError, 'A password is required.'):
                    User.objects.create_user(
                        'farmer@example.com', password,
                        account_type=User.AccountType.FARMER,
                    )

    def test_create_user_requires_valid_account_type(self):
        for account_type in (None, '', 'administrator'):
            with self.subTest(account_type=account_type):
                with self.assertRaisesMessage(ValueError, 'A valid account type is required.'):
                    User.objects.create_user(
                        'farmer@example.com', 'test-password-only',
                        account_type=account_type,
                    )

    @patch.object(User, 'save', autospec=True)
    def test_create_superuser_sets_staff_type_and_permissions(self, save):
        user = User.objects.create_superuser(
            'staff@example.com', 'test-password-only',
        )

        self.assertEqual(user.account_type, User.AccountType.STAFF)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.check_password('test-password-only'))
        save.assert_called_once_with(user, using=None)

    def test_create_superuser_rejects_missing_framework_permissions(self):
        for flag in ('is_staff', 'is_superuser'):
            with self.subTest(flag=flag):
                with self.assertRaisesMessage(ValueError, f'{flag}=True'):
                    User.objects.create_superuser(
                        'staff@example.com', 'test-password-only', **{flag: False},
                    )

    def test_create_superuser_rejects_non_staff_account_type(self):
        for account_type in (User.AccountType.FARMER, User.AccountType.COOPERATIVE):
            with self.subTest(account_type=account_type):
                with self.assertRaisesMessage(ValueError, 'staff account type'):
                    User.objects.create_superuser(
                        'staff@example.com', 'test-password-only',
                        account_type=account_type,
                    )


@override_settings(PASSWORD_HASHERS=[
    'django.contrib.auth.hashers.MD5PasswordHasher',
])
class AuthenticationTests(APISimpleTestCase):
    """Use real authentication and JWT validation; mock only persistence."""

    def setUp(self):
        self.user = User(
            email='farmer@example.com',
            account_type=User.AccountType.FARMER,
            created_at=timezone.now(),
        )
        self.user.set_password('test-password-only')
        self.users = [self.user]
        self.email_lookup = self.enterContext(patch.object(
            User.objects, 'get_by_natural_key',
            side_effect=self.get_user_by_email,
        ))
        self.id_lookup = self.enterContext(patch.object(
            User.objects, 'get', side_effect=self.get_user_by_id,
        ))
        self.token_url = reverse('api:accounts:token_obtain_pair')
        self.refresh_url = reverse('api:accounts:token_refresh')
        self.me_url = reverse('api:accounts:me')

    def get_user_by_email(self, email):
        for user in self.users:
            if user.email == email:
                return user
        raise User.DoesNotExist

    def get_user_by_id(self, *, id):
        for user in self.users:
            if str(user.id) == str(id):
                return user
        raise User.DoesNotExist

    def obtain_tokens(self, **credentials):
        return self.client.post(self.token_url, {
            'email': self.user.email,
            'password': 'test-password-only',
            **credentials,
        }, format='json')

    def authenticate(self, token=None):
        if token is None:
            token = RefreshToken.for_user(self.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    def assert_error(self, response, status, code):
        self.assertEqual(response.status_code, status)
        body = response.json()
        self.assertEqual(set(body), {'error'})
        self.assertEqual(set(body['error']), {'code', 'message', 'details'})
        self.assertEqual(body['error']['code'], code)
        self.assertTrue(body['error']['message'])
        self.assertIsInstance(body['error']['details'], dict)
        if status == 401:
            self.assertIn(
                'Bearer', response.headers.get('WWW-Authenticate', ''),
            )

    def test_valid_authentication_returns_standard_tokens_for_each_role(self):
        for account_type in User.AccountType.values:
            with self.subTest(account_type=account_type):
                self.user.account_type = account_type
                response = self.obtain_tokens()

                self.assertEqual(response.status_code, 200)
                body = response.json()
                self.assertEqual(set(body), {'data', 'meta'})
                self.assertEqual(body['meta'], {})
                self.assertEqual(set(body['data']), {'access', 'refresh'})
                access = AccessToken(body['data']['access'])
                refresh = RefreshToken(body['data']['refresh'])
                for token in (access, refresh):
                    self.assertEqual(token['user_id'], str(self.user.id))
                    self.assertEqual(set(token.payload), {
                        'token_type', 'exp', 'iat', 'jti', 'user_id',
                    })
                self.assertEqual(access['exp'] - access['iat'], 5 * 60)
                self.assertEqual(refresh['exp'] - refresh['iat'], 24 * 60 * 60)
        self.email_lookup.assert_called_with(self.user.email)

    def test_unknown_email_is_rejected(self):
        response = self.obtain_tokens(email='unknown@example.com')
        self.assert_error(response, 401, 'NO_ACTIVE_ACCOUNT')

    def test_wrong_password_is_rejected(self):
        response = self.obtain_tokens(password='incorrect-password')
        self.assert_error(response, 401, 'NO_ACTIVE_ACCOUNT')

    def test_unknown_email_and_wrong_password_are_rejected(self):
        response = self.obtain_tokens(
            email='unknown@example.com', password='incorrect-password',
        )
        self.assert_error(response, 401, 'NO_ACTIVE_ACCOUNT')

    def test_inactive_user_cannot_obtain_tokens(self):
        self.user.is_active = False
        self.assert_error(self.obtain_tokens(), 401, 'NO_ACTIVE_ACCOUNT')

    def test_unusable_password_is_rejected(self):
        self.user.set_unusable_password()
        self.assert_error(self.obtain_tokens(), 401, 'NO_ACTIVE_ACCOUNT')

    def test_missing_credentials_return_validation_details(self):
        response = self.client.post(self.token_url, {}, format='json')
        self.assert_error(response, 400, 'VALIDATION_ERROR')
        self.assertEqual(
            set(response.json()['error']['details']), {'email', 'password'},
        )

    def test_valid_refresh_returns_access_token_that_authenticates(self):
        refresh = self.obtain_tokens().json()['data']['refresh']
        response = self.client.post(
            self.refresh_url, {'refresh': refresh}, format='json',
        )

        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(set(body), {'data', 'meta'})
        self.assertEqual(body['meta'], {})
        self.assertEqual(set(body['data']), {'access'})
        access = AccessToken(body['data']['access'])
        self.assertEqual(access['user_id'], str(self.user.id))
        self.authenticate(body['data']['access'])
        self.assertEqual(self.client.get(self.me_url).status_code, 200)

    def test_malformed_refresh_is_rejected(self):
        response = self.client.post(
            self.refresh_url, {'refresh': 'invalid-token'}, format='json',
        )
        self.assert_error(response, 401, 'TOKEN_NOT_VALID')

    def test_expired_refresh_is_rejected(self):
        refresh = RefreshToken.for_user(self.user)
        refresh.set_exp(lifetime=timedelta(seconds=-1))
        response = self.client.post(
            self.refresh_url, {'refresh': str(refresh)}, format='json',
        )
        self.assert_error(response, 401, 'TOKEN_NOT_VALID')

    def test_tampered_refresh_signature_is_rejected(self):
        refresh = str(RefreshToken.for_user(self.user))
        header, payload, signature = refresh.split('.')
        signature = ('A' if signature[0] != 'A' else 'B') + signature[1:]
        response = self.client.post(self.refresh_url, {
            'refresh': f'{header}.{payload}.{signature}',
        }, format='json')
        self.assert_error(response, 401, 'TOKEN_NOT_VALID')

    def test_access_token_cannot_be_used_to_refresh(self):
        access = RefreshToken.for_user(self.user).access_token
        response = self.client.post(
            self.refresh_url, {'refresh': str(access)}, format='json',
        )
        self.assert_error(response, 401, 'TOKEN_NOT_VALID')

    def test_missing_refresh_returns_validation_details(self):
        response = self.client.post(self.refresh_url, {}, format='json')
        self.assert_error(response, 400, 'VALIDATION_ERROR')
        self.assertEqual(set(response.json()['error']['details']), {'refresh'})

    def test_user_deactivated_after_login_cannot_refresh(self):
        refresh = self.obtain_tokens().json()['data']['refresh']
        self.user.is_active = False
        response = self.client.post(
            self.refresh_url, {'refresh': refresh}, format='json',
        )
        self.assert_error(response, 401, 'NO_ACTIVE_ACCOUNT')

    def test_deleted_user_cannot_refresh(self):
        refresh = self.obtain_tokens().json()['data']['refresh']
        self.users.clear()
        response = self.client.post(
            self.refresh_url, {'refresh': refresh}, format='json',
        )
        self.assert_error(response, 401, 'NO_ACTIVE_ACCOUNT')

    def test_me_returns_only_requesting_users_public_fields(self):
        other_user = User(
            email='other@example.com', account_type=User.AccountType.STAFF,
        )
        self.users.append(other_user)
        access = self.obtain_tokens().json()['data']['access']
        self.authenticate(access)
        response = self.client.get(self.me_url, {'id': str(other_user.id)})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'data': {
                'id': str(self.user.id),
                'email': self.user.email,
                'account_type': self.user.account_type,
                'is_active': True,
                'created_at': (
                    self.user.created_at.isoformat().replace('+00:00', 'Z')
                ),
            },
            'meta': {},
        })
        self.id_lookup.assert_called_with(id=str(self.user.id))

    def test_me_requires_authentication(self):
        self.assert_error(
            self.client.get(self.me_url), 401, 'NOT_AUTHENTICATED',
        )

    def test_me_rejects_invalid_access_token(self):
        self.authenticate('invalid-token')
        self.assert_error(self.client.get(self.me_url), 401, 'TOKEN_NOT_VALID')

    def test_me_rejects_expired_access_token(self):
        access = RefreshToken.for_user(self.user).access_token
        access.set_exp(lifetime=timedelta(seconds=-1))
        self.authenticate(access)
        self.assert_error(self.client.get(self.me_url), 401, 'TOKEN_NOT_VALID')

    def test_me_rejects_refresh_token_as_authentication(self):
        self.authenticate(RefreshToken.for_user(self.user))
        self.assert_error(self.client.get(self.me_url), 401, 'TOKEN_NOT_VALID')

    def test_me_rejects_user_deactivated_after_login(self):
        self.authenticate()
        self.user.is_active = False
        self.assert_error(self.client.get(self.me_url), 401, 'USER_INACTIVE')

    def test_me_rejects_deleted_user(self):
        self.authenticate()
        self.users.clear()
        self.assert_error(self.client.get(self.me_url), 401, 'USER_NOT_FOUND')

    def test_me_does_not_allow_updates(self):
        self.authenticate()
        response = self.client.patch(
            self.me_url, {'account_type': User.AccountType.STAFF},
            format='json',
        )
        self.assert_error(response, 405, 'METHOD_NOT_ALLOWED')
        self.assertEqual(self.user.account_type, User.AccountType.FARMER)


class AccountTypePermissionTests(SimpleTestCase):
    permissions = (
        (IsFarmer, User.AccountType.FARMER),
        (IsCooperative, User.AccountType.COOPERATIVE),
        (IsStaff, User.AccountType.STAFF),
    )

    def test_each_permission_accepts_only_its_account_type(self):
        for permission, allowed_type in self.permissions:
            for account_type in User.AccountType.values:
                with self.subTest(
                    permission=permission.__name__, account_type=account_type,
                ):
                    request = SimpleNamespace(user=User(
                        account_type=account_type,
                    ))
                    self.assertEqual(
                        permission().has_permission(request, None),
                        account_type == allowed_type,
                    )

    def test_each_permission_rejects_anonymous_users(self):
        for permission, _ in self.permissions:
            with self.subTest(permission=permission.__name__):
                request = SimpleNamespace(user=AnonymousUser())
                self.assertFalse(permission().has_permission(request, None))

    def test_django_staff_and_superuser_flags_do_not_override_roles(self):
        for permission, allowed_type in self.permissions:
            for account_type in User.AccountType.values:
                with self.subTest(
                    permission=permission.__name__, account_type=account_type,
                ):
                    request = SimpleNamespace(user=User(
                        account_type=account_type,
                        is_staff=True, is_superuser=True,
                    ))
                    self.assertEqual(
                        permission().has_permission(request, None),
                        account_type == allowed_type,
                    )

    def test_each_permission_rejects_unknown_account_type(self):
        for permission, _ in self.permissions:
            with self.subTest(permission=permission.__name__):
                request = SimpleNamespace(user=User(
                    account_type='administrator',
                ))
                self.assertFalse(permission().has_permission(request, None))
