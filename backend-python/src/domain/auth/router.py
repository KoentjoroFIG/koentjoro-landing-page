from typing import Any

from fastapi import APIRouter
from firebase_admin import auth

router = APIRouter()


@router.get("/get_user_by_id")
def get_user_by_id(id: str) -> Any:
    user = auth.get_user(id)
    return user
