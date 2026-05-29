from datetime import datetime, timezone
from typing import Optional

from beanie import Document
from pydantic import EmailStr, Field

from src.database.base_model import TimestampedModel
from src.utils.model_registration import ModelRegistration


@ModelRegistration.register_model
class ContactMessageModel(Document, TimestampedModel):
    """Model for storing contact form submissions."""

    name: str = Field(..., description="Sender's name")
    email: EmailStr = Field(..., description="Sender's email")
    message: str = Field(..., description="Message content")
    is_read: bool = Field(default=False, description="Whether the message has been read")

    class Settings:
        name = "contact_messages"


@ModelRegistration.register_model
class BidSubmissionModel(Document, TimestampedModel):
    """Model for storing bid-to-hire submissions."""

    company_name: str = Field(..., description="Company name")
    position: str = Field(..., description="Job position offered")
    worksite: str = Field(..., description="Work location type")
    type: str = Field(..., description="Employment type")
    salary: str = Field(..., description="Salary offered")
    benefits: list[str] = Field(default_factory=list, description="Benefits offered")
    message: str = Field(default="", description="Additional message")
    is_reviewed: bool = Field(default=False, description="Whether the bid has been reviewed")

    class Settings:
        name = "bid_submissions"
