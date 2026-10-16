from datetime import timedelta
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework_simplejwt.tokens import AccessToken


class UserService:
    @staticmethod
    def register_user(name: str, email: str, password: str) -> User:
        user = User.objects.create_user(
            username=email.lower().strip(),
            email=email.lower().strip(),
            password=password,
            first_name=name.strip()
        )
        return user

    @staticmethod
    def authenticate_user(email: str, password: str, remember_me: bool = False):
        user = authenticate(username=email.lower().strip(), password=password)
        if not user or not user.is_active:
            return None, None

        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

        token = AccessToken.for_user(user)
        if remember_me:
            token.set_exp(lifetime=timedelta(days=30))

        return user, str(token)

    @staticmethod
    def serialize_user_payload(user: User) -> dict:
        return {
            "id": user.id,
            "name": user.first_name or user.username,
            "email": user.email,
            "created_at": user.date_joined,
            "last_login": user.last_login
        }
