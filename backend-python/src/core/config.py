from pathlib import Path
from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    APP_VERSION: str
    APP_NAME: str
    APP_STAGE: str
    BASE_URL: str

    # MongoDB Settings
    CONNECTION_STRING: SecretStr
    MONGODB_NAME: str

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=Path(__file__).resolve().parents[2] / ".env",
        env_file_encoding="utf-8",
    )

@lru_cache
def get_settings():
    settings = Settings() # type: ignore[Args]
    try:
        return settings
    finally:
        del settings

settings = get_settings()