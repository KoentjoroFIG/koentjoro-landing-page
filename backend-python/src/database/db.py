from typing import Optional, Sequence
from beanie import init_beanie
from pymongo import AsyncMongoClient
from src.core.config import settings


_client: Optional[AsyncMongoClient] = None

async def init_db(models: Sequence[type] = []):
    global _client
    
    if _client is None:
        _client = AsyncMongoClient(settings.CONNECTION_STRING.get_secret_value())
        await init_beanie(database=_client.get_database(settings.MONGODB_NAME), document_models=models)

async def close_db():
    global _client
    
    if _client is not None:
        await _client.close()
        _client = None

def get_db_client() -> Optional[AsyncMongoClient]:
    return _client

def get_session():
    if _client is None:
        return None
    return _client.start_session()