from http import HTTPStatus
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum


class AuthMethod(str, Enum):
    EMAIL = "email"
    GOOGLE = "google"


class TokenType(str, Enum):
    ACCESS = "access"
    REFRESH = "refresh"


class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"


class TokenPayload(BaseModel):
    sub: str = Field(..., description="Subject of the token, typically the user ID")
    type: TokenType = Field(..., description="Type of the token, e.g., access or refresh")
    role: UserRole = Field(default=UserRole.USER, description="Role of the user (default: user)")
    email: EmailStr = Field(..., description="Email of the user")
    exp: Optional[int] = Field(default=None, description="Expiration time of the token in seconds")


class LoginRequest(BaseModel):
    method: AuthMethod = Field(..., description="Authentication method used")
    token: str = Field(..., description="Authentication token from the provider")

class StatusResponse(BaseModel):
    http_status: HTTPStatus = Field(..., description="Status of the operation")
    message: Optional[str] = Field(default=None, description="Additional message regarding the status")

class LoginResponse(BaseModel):
    status: StatusResponse = Field(..., description="Status of the login operation")
    access_token: Optional[str] = Field(default=None, description="JWT access token")
    refresh_token: Optional[str] = Field(default=None, description="JWT refresh token")
    token_type: Optional[str] =  Field(default="bearer", description="Type of the token (default: bearer)")