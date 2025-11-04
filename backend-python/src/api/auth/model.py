from __future__ import annotations

from datetime import datetime
from typing import List, Optional, Type
from uuid import UUID

from beanie import Document, Link
from bson import ObjectId
from pydantic import EmailStr, Field, SecretStr, model_validator

from src.api.auth.schema import AuthMethod
from src.database.base_model import ExpireableModel, SoftDeleteModel, TimestampedModel
from src.utils.model_registration import ModelRegistration


@ModelRegistration.register_model
class UserModel(Document, TimestampedModel, SoftDeleteModel):
    """User model for storing user information."""

    username: Optional[str] = Field(default=None, description="The user's username")
    email: EmailStr = Field(..., description="The user's email address")
    method: AuthMethod = Field(
        default=AuthMethod.EMAIL, description="The authentication method used"
    )
    is_verified: bool = Field(
        default=False, description="Whether the user's email is verified"
    )
    tokens: List[Link["UserTokenModel"]] = Field(
        ..., description="Reference to the user's tokens"
    )

    class Settings:
        name = "users"


@ModelRegistration.register_model
class UserTokenModel(Document, TimestampedModel, ExpireableModel):
    """User token model for storing user tokens."""

    user_id: Optional[ObjectId] = Field(default=None, description="The ID of the user")
    jti: UUID = Field(..., description="The unique identifier for the token")
    user: Link["UserModel"] = Field(..., description="Reference to the user")
    access_token: SecretStr = Field(..., description="The access token string")
    refresh_token: SecretStr = Field(..., description="The refresh token string")
    revoked_at: Optional[datetime] = Field(
        default=None, description="The timestamp when the token was revoked"
    )
    ip_address: Optional[str] = Field(
        default=None, description="The IP address from which the token was issued"
    )
    blacklist: Optional[Link["TokenBlacklistModel"]] = Field(
        default=None, description="Reference to the token blacklist entry"
    )

    class Settings:
        name = "user_tokens"
        indexes = [
            {"fields": ["jti"], "unique": True},
            {"fields": ["user_id"]},
        ]

    @model_validator(mode="before")
    @classmethod
    def sync_user_id(cls: Type["UserTokenModel"], values: dict) -> dict:
        user = values.get("user")
        user_id = values.get("user_id")

        if user and hasattr(user, "id"):
            if user.id != user_id:
                print(
                    f"user_id mismatch: user.id={user.id} vs user_id={user_id}. Overriding with user.id."
                )
                values["user_id"] = user.id
        return values


@ModelRegistration.register_model
class TokenBlacklistModel(Document, TimestampedModel, ExpireableModel):
    """Model for storing blacklisted tokens."""

    jti: UUID = Field(
        ..., description="The unique identifier for the blacklisted token"
    )
    token: Optional[Link["UserTokenModel"]] = Field(
        ..., description="Reference to the token"
    )
    reason: Optional[str] = Field(
        default=None, description="Reason for blacklisting the token"
    )

    class Settings:
        name = "token_blacklist"
        indexes = [
            {"fields": ["jti"], "unique": True},
        ]

    @model_validator(mode="before")
    @classmethod
    def sync_token(cls: Type["TokenBlacklistModel"], values: dict) -> dict:
        user_token = values.get("token")
        jti = values.get("jti")

        if user_token and hasattr(user_token, "jti"):
            if user_token.jti != jti:
                print(
                    f"user_token.jti mismatch: user.jti={user_token.jti} vs jti={jti}. Overriding with user.jti."
                )
                values["jti"] = user_token.jti
        return values
