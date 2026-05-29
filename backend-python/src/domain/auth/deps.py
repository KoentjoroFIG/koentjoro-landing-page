from typing import Optional

from fastapi import Depends, Header

from src.domain.auth.exception import AuthException
from src.domain.auth.model import UserModel
from src.domain.auth.service import AuthService


async def get_current_user(
    authorization: Optional[str] = Header(None),
) -> UserModel:
    """Dependency to extract and validate the current user from the Authorization header."""
    if not authorization or not authorization.startswith("Bearer "):
        raise AuthException.INVALID_TOKEN

    token = authorization.split(" ", 1)[1]
    user = await AuthService.get_current_user(token)
    if not user:
        raise AuthException.USER_NOT_FOUND
    return user
