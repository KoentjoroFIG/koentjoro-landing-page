from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel, Field


class TimestampedModel(BaseModel):
    """
    A base model that includes created_at and updated_at timestamps.
    """

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="The creation timestamp of the record in ISO 8601 format.",
    )
    updated_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="The last update timestamp of the record in ISO 8601 format.",
    )


class ExpireableModel(BaseModel):
    """
    A base model that includes an expiration timestamp.
    """

    expires_at: datetime = Field(
        description="The expiration timestamp of the record in ISO 8601 format."
    )


class SoftDeleteModel(BaseModel):
    """
    A base model that includes soft delete functionality.
    """

    is_deleted: bool = Field(
        default=False, description="Whether the record is soft-deleted."
    )
    deleted_at: Optional[datetime] = Field(
        default=None,
        description="The deletion timestamp of the record in ISO 8601 format, or null if not deleted.",
    )
