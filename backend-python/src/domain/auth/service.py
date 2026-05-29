from typing import Optional
from uuid import uuid4

from firebase_admin import auth as firebase_auth
from pydantic import EmailStr

from src.core.config import settings
from src.core.logger import logger_main as logger
from src.domain.auth.config import access_token_strategy, refresh_token_strategy
from src.domain.auth.exception import AuthException
from src.domain.auth.model import UserModel, UserTokenModel
from src.domain.auth.repository import AuthRepository
from src.domain.auth.schema import AuthMethod


class AuthService:
    """Service layer for authentication operations."""

    @staticmethod
    async def register_with_firebase(
        firebase_uid: str,
        email: EmailStr,
        method: AuthMethod,
        username: Optional[str] = None,
    ) -> dict:
        """Register a user after Firebase authentication."""
        existing_user = await AuthRepository.get_user_by_email(email)
        if existing_user:
            # User exists — return tokens for existing user
            return await AuthService._generate_tokens(existing_user)

        user = await AuthRepository.create_user(
            email=email,
            method=method,
            username=username,
            is_verified=True,  # Firebase handles email verification
        )

        return await AuthService._generate_tokens(user)

    @staticmethod
    async def verify_firebase_token(id_token: str) -> dict:
        """Verify a Firebase ID token and return or create the user."""
        try:
            decoded_token = firebase_auth.verify_id_token(id_token)
        except Exception as e:
            logger.error(f"Firebase token verification failed: {e}")
            raise AuthException.INVALID_TOKEN

        email = decoded_token.get("email")
        uid = decoded_token.get("uid")
        name = decoded_token.get("name")
        sign_in_provider = decoded_token.get("firebase", {}).get("sign_in_provider", "")

        method = (
            AuthMethod.GOOGLE if "google" in sign_in_provider else AuthMethod.EMAIL
        )

        return await AuthService.register_with_firebase(
            firebase_uid=uid,
            email=email,
            method=method,
            username=name,
        )

    @staticmethod
    async def refresh_access_token(refresh_token: str) -> dict:
        """Generate a new access token from a valid refresh token."""
        payload = refresh_token_strategy.decode(refresh_token)
        if not payload:
            raise AuthException.INVALID_TOKEN

        jti = payload.get("jti")
        if await AuthRepository.is_token_blacklisted(jti):
            raise AuthException.TOKEN_REVOKED

        user = await AuthRepository.get_user_by_email(payload.get("email"))
        if not user:
            raise AuthException.USER_NOT_FOUND

        new_access_token = access_token_strategy.encode(
            {"sub": str(user.id), "email": user.email}
        )

        return {
            "access_token": new_access_token,
            "token_type": "bearer",
        }

    @staticmethod
    async def logout(jti: str) -> None:
        """Blacklist the current token pair."""
        await AuthRepository.blacklist_token(jti=jti, reason="logout")

    @staticmethod
    async def get_current_user(access_token: str) -> Optional[UserModel]:
        """Validate access token and return the current user."""
        payload = access_token_strategy.decode(access_token)
        if not payload:
            raise AuthException.INVALID_TOKEN

        jti = payload.get("jti")
        if jti and await AuthRepository.is_token_blacklisted(jti):
            raise AuthException.TOKEN_REVOKED

        email = payload.get("email")
        user = await AuthRepository.get_user_by_email(email)
        if not user:
            raise AuthException.USER_NOT_FOUND

        return user

    @staticmethod
    async def _generate_tokens(user: UserModel) -> dict:
        """Generate access and refresh tokens for a user."""
        jti = str(uuid4())
        token_payload = {
            "sub": str(user.id),
            "email": user.email,
            "jti": jti,
        }

        access_token = access_token_strategy.encode(token_payload)
        refresh_token = refresh_token_strategy.encode(token_payload)

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "id": str(user.id),
                "email": user.email,
                "username": user.username,
                "is_verified": user.is_verified,
            },
        }
