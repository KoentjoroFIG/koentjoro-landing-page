from pymongo.errors import ConnectionFailure

from .database.db import get_client


async def get_health_status() -> dict:
    _client = get_client()
    try:
        if _client:
            await _client.admin.command("ping")
            overall_status = {
                "server_status": "running",
                "database_status": "connected",
                "message": "All praise to Allah",
            }
        else:
            overall_status = {
                "server_status": "running",
                "database_status": "not_found",
                "message": "Server is unhealthy [DB Not Found]",
            }
    except ConnectionFailure:
        overall_status = {
            "server_status": "running",
            "database_status": "disconnected",
            "message": "Server is unhealthy [DB Disconnected]",
        }
    return overall_status
