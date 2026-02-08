from src.domain.auth.utils.token_utils import JWTAccessToken, JWTRefreshToken, TokenFactory
from src.core.config import settings

access_token_strategy = JWTAccessToken(
    secret_key=settings.JWT_SECRET,
    algorithm=settings.JWT_ALGORITHM,
    expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
)

access_token_factory = TokenFactory(access_token_strategy)

refresh_token_strategy = JWTRefreshToken(
    secret_key=settings.JWT_SECRET,
    algorithm=settings.JWT_ALGORITHM,
    expires_in=settings.JWT_REFRESH_TOKEN_EXPIRE_MINUTES * 60,
)

refresh_token_factory = TokenFactory(refresh_token_strategy)

def get_access_token_factory() -> TokenFactory:
    return access_token_factory

def get_refresh_token_factory() -> TokenFactory:
    return refresh_token_factory