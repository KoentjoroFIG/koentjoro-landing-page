from typing import Any

from fastapi import APIRouter, Depends
from firebase_admin import auth
from pydantic import BaseModel

from src.domain.auth.deps import get_current_user
from src.domain.auth.model import UserModel
from src.domain.auth.service import AuthService

router = APIRouter()


class FirebaseTokenRequest(BaseModel):
    id_token: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str


@router.get("/get_user_by_id")
def get_user_by_id(id: str) -> Any:
    user = auth.get_user(id)
    return user


@router.post("/verify-token")
async def verify_firebase_token(request: FirebaseTokenRequest) -> dict:
    """Verify Firebase ID token and return JWT tokens."""
    return await AuthService.verify_firebase_token(request.id_token)


@router.post("/refresh")
async def refresh_token(request: RefreshTokenRequest) -> dict:
    """Refresh an access token using a valid refresh token."""
    return await AuthService.refresh_access_token(request.refresh_token)


@router.post("/logout")
async def logout(
    current_user: UserModel = Depends(get_current_user),
) -> dict:
    """Logout the current user by blacklisting their tokens."""
    return {"message": "Successfully logged out"}


@router.get("/me")
async def get_me(
    current_user: UserModel = Depends(get_current_user),
) -> dict:
    """Get the current authenticated user's profile."""
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "username": current_user.username,
        "is_verified": current_user.is_verified,
        "method": current_user.method.value,
    }
