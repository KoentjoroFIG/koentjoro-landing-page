from typing import Optional, Type

from beanie import init_beanie
from pymongo import AsyncMongoClient
from pymongo.asynchronous.client_session import AsyncClientSession
from pymongo.errors import ConnectionFailure
from src.core.config import settings
from src.utils.model_registration import ModelRegistration


class DatabaseManager:
    """
    A singleton manager for MongoDB database connections using AsyncMongoClient and Beanie ODM.

    This class handles the initialization, management, and closure of MongoDB connections,
    integrates with Beanie for document modeling, and provides utilities for sessions and connectivity checks.

    Attributes:
        __client (Optional[AsyncMongoClient]): The private MongoDB client instance, managed as a class variable.

    Usage:
        - Initialize the database connection and Beanie models using `init_db`.
        - Close the database connection using `close_db`.
        - Retrieve the current client with `get_client`.
        - Start a new client session with `get_session`.
        - Check database connectivity with `ping_db`.
    """

    __client: Optional[AsyncMongoClient] = None

    @classmethod
    async def init_db(cls: Type["DatabaseManager"]) -> None:
        """
        Initialize the database connection and Beanie ODM with the provided document models.

        This method establishes a connection to MongoDB using the configured settings,
        verifies connectivity by pinging the server, and initializes Beanie with the given models.
        If the client is already initialized, this method does nothing. This method returns `None`.

        Example:
            >>> await DatabaseManager.init_db()
        """
        try:
            if cls.__client is None:  # Updated reference
                cls.__client = AsyncMongoClient(  # Updated reference
                    settings.CONNECTION_STRING.get_secret_value(),
                    minPoolSize=settings.MONGODB_MIN_POOL_SIZE,
                    maxPoolSize=settings.MONGODB_MAX_POOL_SIZE,
                    maxIdleTimeMS=settings.MONGODB_MAX_IDLE_TIME_MS,
                    maxConnecting=settings.MONGODB_MAX_CONNECTING,
                    # connectTimeoutMS=settings.MONGODB_CONNECT_TIMEOUT_MS,
                    # serverSelectionTimeoutMS=settings.MONGODB_SERVER_SELECTION_TIMEOUT_MS,
                    # socketTimeoutMS=settings.MONGODB_SOCKET_TIMEOUT_MS,
                )

                is_pinged = await cls.ping_db()
                if is_pinged:
                    print("MongoDB connection established successfully")
                else:
                    cls.__client = None  # Updated reference
                    print("MongoDB connection failed: Unable to ping the server")

                if cls.__client is not None:  # Updated reference
                    await init_beanie(
                        database=cls.__client.get_database(
                            settings.MONGODB_NAME
                        ),  # Updated reference
                        document_models=ModelRegistration.get_registered_models(),
                    )
                    print("Beanie/Database initialized successfully")

        except Exception as e:
            print(f"Error initializing Beanie/Database: {e}")
            raise e

    @classmethod
    async def close_db(cls: Type["DatabaseManager"]) -> None:
        """
        Close the database connection if it exists.

        This method safely closes the MongoDB client connection and resets the client reference.
        If no connection is active, it logs a message and does nothing. This method returns `None`.

        Example:
            >>> await DatabaseManager.close_db()
        """
        if cls.__client is not None:  # Updated reference
            try:
                await cls.__client.close()  # Updated reference
                cls.__client = None  # Updated reference
                print("Database connection closed successfully")
            except Exception as e:
                print(f"Error closing database connection: {e}")
        else:
            print("No database connection to close")

    @classmethod
    def get_client(cls: Type["DatabaseManager"]) -> Optional[AsyncMongoClient]:
        """
        Retrieve the current MongoDB client instance.

        Returns:
            `Optional[AsyncMongoClient]`: The active AsyncMongoClient instance, or None if not initialized.

        Example:
            >>> client = DatabaseManager.get_client()
            >>> if client:
            ...     # Use the client for database operations
            ...     db = client.get_database("mydatabase")
            ...     # Perform operations on the database
            ...     collection = db.get_collection("mycollection")
            ...     result = await collection.find_one({"name": "example"})
            ...     print(result)
        """
        return cls.__client  # Updated reference

    @classmethod
    async def get_session(cls: Type["DatabaseManager"]) -> Optional[AsyncClientSession]:
        """
        Start and return a new MongoDB client session.

        This method creates a new session for transactional operations or other session-based queries.
        If no client is available, it returns None.

        Returns:
            `Optional[AsyncClientSession]`: A new AsyncClientSession instance, or None if the client is not initialized.

        Example:
            >>> session = await DatabaseManager.get_session()
            >>> if session:
            ...     async with session.start_transaction():
            ...         # Perform transactional operations here
            ...         result = await User.insert_one({"name": "example"}, session=session)
            ...         print(result)
        """

        if cls.__client is None:  # Updated reference
            print("No database client available for session")
            return None
        return cls.__client.start_session()  # Updated reference

    @classmethod
    async def ping_db(cls: Type["DatabaseManager"]) -> bool:
        """
        Ping the MongoDB server to verify connectivity.

        This method sends a ping command to the admin database to check if the connection is active.

        Returns:
            `bool`: True if the ping is successful, indicating the database is reachable; False otherwise.

        Example:
            >>> is_connected = await DatabaseManager.ping_db()
            >>> if is_connected:
            ...     print("Database is connected")
        """
        try:
            if cls.__client:  # Updated reference
                await cls.__client.admin.command("ping")  # Updated reference
                return True
            return False
        except ConnectionFailure:
            return False
