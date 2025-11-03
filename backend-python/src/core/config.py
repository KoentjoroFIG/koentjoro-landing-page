from functools import lru_cache
from pathlib import Path

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_VERSION: str = ""
    APP_NAME: str = ""
    APP_STAGE: str = ""
    BASE_URL: str = ""

    # MongoDB Settings
    CONNECTION_STRING: SecretStr = SecretStr("")
    MONGODB_NAME: str = ""
    MONGODB_MIN_POOL_SIZE: int = 10
    MONGODB_MAX_POOL_SIZE: int = 100
    MONGODB_MAX_IDLE_TIME_MS: int = 300000
    MONGODB_MAX_CONNECTING: int = 2
    # MONGODB_CONNECT_TIMEOUT_MS: int
    # MONGODB_SERVER_SELECTION_TIMEOUT_MS: int
    # MONGODB_SOCKET_TIMEOUT_MS: int

    # JWT Settings
    JWT_SECRET: SecretStr = SecretStr("")
    JWT_ALGORITHM: str = "HS256"

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8",
    )


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    try:
        return settings
    finally:
        del settings


settings = get_settings()
