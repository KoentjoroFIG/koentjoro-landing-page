from typing import Optional

from beanie import Document
from pydantic import EmailStr, Field
from src.api.auth.schema import AuthMethod
from src.database.base_model import SoftDeleteModel, TimestampedModel


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

    class Settings:
        name = "users"
