from typing import Optional, Sequence

from beanie import init_beanie
from pymongo import AsyncMongoClient
from pymongo.asynchronous.client_session import AsyncClientSession
from pymongo.errors import ConnectionFailure
from src.core.config import settings

_client: Optional[AsyncMongoClient] = None


async def init_db(models: Sequence[type] = []) -> None:
    global _client
    try:
        if _client is None:
            _client = AsyncMongoClient(
                settings.CONNECTION_STRING.get_secret_value(),
                minPoolSize=settings.MONGODB_MIN_POOL_SIZE,
                maxPoolSize=settings.MONGODB_MAX_POOL_SIZE,
                maxIdleTimeMS=settings.MONGODB_MAX_IDLE_TIME_MS,
                maxConnecting=settings.MONGODB_MAX_CONNECTING,
                # connectTimeoutMS=settings.MONGODB_CONNECT_TIMEOUT_MS,
                # serverSelectionTimeoutMS=settings.MONGODB_SERVER_SELECTION_TIMEOUT_MS,
                # socketTimeoutMS=settings.MONGODB_SOCKET_TIMEOUT_MS,
            )

            try:
                await _client.admin.command("ping")
                print("MongoDB connection established successfully")
            except ConnectionFailure as cf:
                _client = None
                print(f"MongoDB connection failed: {cf}")

            if _client is not None:
                await init_beanie(
                    database=_client.get_database(settings.MONGODB_NAME),
                    document_models=models,
                )
                print("Beanie/Database initialized successfully")

    except Exception as e:
        print(f"Error initializing Beanie/Database: {e}")
        raise e


async def close_db() -> None:
    global _client

    if _client is not None:
        try:
            await _client.close()
            _client = None
            print("Database connection closed successfully")
        except Exception as e:
            print(f"Error closing database connection: {e}")
    else:
        print("No database connection to close")


def get_client() -> Optional[AsyncMongoClient]:
    return _client


async def get_session() -> Optional[AsyncClientSession]:
    if _client is None:
        print("No database client available for session")
        return None
    return _client.start_session()
