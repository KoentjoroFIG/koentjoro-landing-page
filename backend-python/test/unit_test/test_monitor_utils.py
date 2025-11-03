from typing import Generator

import pytest
from pytest_mock import MockerFixture
from src.database.db import DatabaseManager
from src.utils.monitor import MonitorUtils


@pytest.fixture(autouse=True)
def reset_db_client(mocker: MockerFixture) -> Generator[None, None]:
    mocker.patch.object(DatabaseManager, "_DatabaseManager__client", None)
    yield
    mocker.patch.object(DatabaseManager, "_DatabaseManager__client", None)


@pytest.mark.asyncio
async def test_get_health_status_connected(mocker: MockerFixture):
    """Test health status when database is connected and ping succeeds"""
    mock_ping = mocker.patch.object(DatabaseManager, "ping_db", return_value=True)

    result = await MonitorUtils.get_health_status()

    assert result == {
        "server_status": "running",
        "database_status": "connected",
        "message": "All praise to Allah",
    }
    mock_ping.assert_awaited_once()


@pytest.mark.asyncio
async def test_get_health_status_disconnected(mocker: MockerFixture):
    """Test health status when client exists but ping fails (disconnected)"""
    mock_client = mocker.AsyncMock()
    mock_ping = mocker.patch.object(DatabaseManager, "ping_db", return_value=False)
    mock_get_client = mocker.patch.object(
        DatabaseManager, "get_client", return_value=mock_client
    )

    result = await MonitorUtils.get_health_status()

    assert result == {
        "server_status": "running",
        "database_status": "disconnected",
        "message": "Server is unhealthy [DB Disconnected]",
    }
    mock_ping.assert_awaited_once()
    mock_get_client.assert_called_once()


@pytest.mark.asyncio
async def test_get_health_status_not_found(mocker: MockerFixture):
    """Test health status when client is None (not found)"""
    mock_ping = mocker.patch.object(DatabaseManager, "ping_db", return_value=False)
    mock_get_client = mocker.patch.object(
        DatabaseManager, "get_client", return_value=None
    )

    result = await MonitorUtils.get_health_status()

    assert result == {
        "server_status": "running",
        "database_status": "not_found",
        "message": "Server is unhealthy [DB Not Found]",
    }
    mock_ping.assert_awaited_once()
    mock_get_client.assert_called_once()
