from typing import Optional

from beanie import PydanticObjectId
from pydantic import EmailStr

from src.domain.auth.model import TokenBlacklistModel, UserModel, UserTokenModel
from src.domain.auth.schema import AuthMethod


class AuthRepository:
    """Repository for auth-related database operations."""

    @staticmethod
    async def get_user_by_email(email: EmailStr) -> Optional[UserModel]:
        return await UserModel.find_one(
            UserModel.email == email, UserModel.is_deleted == False
        )

    @staticmethod
    async def get_user_by_id(user_id: PydanticObjectId) -> Optional[UserModel]:
        return await UserModel.find_one(
            UserModel.id == user_id, UserModel.is_deleted == False
        )

    @staticmethod
    async def create_user(
        email: EmailStr,
        method: AuthMethod,
        username: Optional[str] = None,
        is_verified: bool = False,
    ) -> UserModel:
        user = UserModel(
            email=email,
            method=method,
            username=username,
            is_verified=is_verified,
            tokens=[],
        )
        await user.insert()
        return user

    @staticmethod
    async def save_token(token: UserTokenModel) -> UserTokenModel:
        await token.insert()
        return token

    @staticmethod
    async def get_token_by_jti(jti: str) -> Optional[UserTokenModel]:
        return await UserTokenModel.find_one(UserTokenModel.jti == jti)

    @staticmethod
    async def blacklist_token(jti: str, reason: str = "logout") -> None:
        token = await UserTokenModel.find_one(UserTokenModel.jti == jti)
        if token:
            blacklist_entry = TokenBlacklistModel(
                jti=jti,
                token=token,
                reason=reason,
            )
            await blacklist_entry.insert()

    @staticmethod
    async def is_token_blacklisted(jti: str) -> bool:
        entry = await TokenBlacklistModel.find_one(TokenBlacklistModel.jti == jti)
        return entry is not None

    @staticmethod
    async def verify_user_email(user: UserModel) -> UserModel:
        user.is_verified = True
        await user.save()
        return user
