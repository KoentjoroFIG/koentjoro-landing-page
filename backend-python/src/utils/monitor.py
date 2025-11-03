from src.database.db import DatabaseManager


class MonitorUtils:
    @staticmethod
    async def get_health_status() -> dict:
        """
        Get the health status of the server and database.

        Returns:
            dict: A dictionary containing server and database status.

        Example:
            >>> status = await get_health_status()
            >>> print(status)
            {
                "server_status": "running",
                "database_status": "connected",
                "message": "All praise to Allah",
            }
        """
        is_pinged = await DatabaseManager.ping_db()

        if is_pinged:
            overall_status = {
                "server_status": "running",
                "database_status": "connected",
                "message": "All praise to Allah",
            }
        else:
            client = DatabaseManager.get_client()
            database_status = "not_found" if client is None else "disconnected"
            overall_status = {
                "server_status": "running",
                "database_status": database_status,
                "message": f"Server is unhealthy [DB {database_status.replace('_', ' ').title()}]",
            }

        return overall_status
