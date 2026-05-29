from src.core.config import settings
from src.domain.auth.utils.token_utils import JWTAccessToken, JWTRefreshToken

access_token_strategy = JWTAccessToken(
    secret_key=settings.JWT_SECRET,
    algorithm=settings.JWT_ALGORITHM,
    expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
)

refresh_token_strategy = JWTRefreshToken(
    secret_key=settings.JWT_SECRET,
    algorithm=settings.JWT_ALGORITHM,
    expires_in=settings.JWT_REFRESH_TOKEN_EXPIRE_MINUTES * 60,
)
