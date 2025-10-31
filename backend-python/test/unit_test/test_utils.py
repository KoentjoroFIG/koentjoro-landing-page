from typing import Generator

import pytest
from pymongo.errors import ConnectionFailure
from pytest_mock import MockerFixture
from src.utils import get_health_status


@pytest.fixture(autouse=True)
def reset_db_client(mocker: MockerFixture) -> Generator[None, None]:
    mocker.patch("src.database.db._client", None)
    yield
    mocker.patch("src.database.db._client", None)


@pytest.mark.asyncio
async def test_get_health_status(mocker: MockerFixture) -> None:
    mock_client_instance = mocker.AsyncMock()
    mock_client_instance.admin.command.return_value = {"ok": 1}
    mocker.patch("src.database.db._client", mock_client_instance)

    assert await get_health_status() == {
        "server_status": "running",
        "database_status": "connected",
        "message": "All praise to Allah",
    }

    mock_client_instance.admin.command.assert_awaited_once_with("ping")


@pytest.mark.asyncio
async def test_get_health_status_unhealthy(mocker: MockerFixture) -> None:
    mock_client_instance = mocker.AsyncMock()
    mock_client_instance.admin.command = mocker.AsyncMock(side_effect=ConnectionFailure)
    mocker.patch("src.database.db._client", mock_client_instance)

    assert await get_health_status() == {
        "server_status": "running",
        "database_status": "disconnected",
        "message": "Server is unhealthy [DB Disconnected]",
    }

    mock_client_instance.admin.command.assert_awaited_once_with("ping")
