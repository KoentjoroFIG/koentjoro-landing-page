from fastapi import APIRouter

from src.domain.auth.router import router as auth_router
from src.domain.email.router import router as email_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth")
router.include_router(email_router, prefix="/email")
