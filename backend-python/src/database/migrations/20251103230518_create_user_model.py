from typing import Self, Type

from beanie import free_fall_migration
from pymongo.asynchronous.client_session import AsyncClientSession

from src.api.auth.model import UserModel


class Forward:
    @free_fall_migration(document_models=[UserModel])
    async def add_user_indexes(self: Self, session: Type[AsyncClientSession]) -> None:
        """Add indexes to UserModel."""
        collection = UserModel.get_pymongo_collection()
        await collection.create_index(
            [("email", 1)],
            unique=True,
            partialFilterExpression={"is_deleted": False},
            name="unique_email_idx",
        )


class Backward:
    @free_fall_migration(document_models=[UserModel])
    async def remove_user_indexes(
        self: Self, session: Type[AsyncClientSession]
    ) -> None:
        """Remove indexes from UserModel."""
        collection = UserModel.get_pymongo_collection()
        await collection.drop_index("unique_email_idx")
