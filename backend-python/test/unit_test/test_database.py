from typing import Generator

import pytest
from pymongo.errors import ConnectionFailure
from pytest_mock import MockerFixture
from src.core.config import settings
from src.database.db import close_db, get_client, get_session, init_db


@pytest.fixture(autouse=True)
def reset_db_client(mocker: MockerFixture) -> Generator[None, None]:
    mocker.patch("src.database.db._client", None)
    yield
    mocker.patch("src.database.db._client", None)


@pytest.mark.asyncio
async def test_init_db(mocker: MockerFixture):
    mock_client_instance = mocker.AsyncMock()
    mock_client_instance.admin.command = mocker.AsyncMock(return_value={"ok": 1})
    mock_database = mocker.Mock()
    mock_client_instance.get_database = mocker.Mock(return_value=mock_database)

    mock_client_class = mocker.patch(
        "src.database.db.AsyncMongoClient", return_value=mock_client_instance
    )

    mock_init_beanie = mocker.patch(
        "src.database.db.init_beanie", new=mocker.AsyncMock(return_value=None)
    )

    await init_db(models=[])

    mock_client_class.assert_called_once_with(
        settings.CONNECTION_STRING.get_secret_value(),
        minPoolSize=settings.MONGODB_MIN_POOL_SIZE,
        maxPoolSize=settings.MONGODB_MAX_POOL_SIZE,
        maxIdleTimeMS=settings.MONGODB_MAX_IDLE_TIME_MS,
        maxConnecting=settings.MONGODB_MAX_CONNECTING,
    )

    mock_client_instance.admin.command.assert_called_once_with("ping")

    mock_client_instance.get_database.assert_called_once_with(settings.MONGODB_NAME)

    mock_init_beanie.assert_called_once_with(database=mock_database, document_models=[])


@pytest.mark.asyncio
async def test_init_db_connection_failure(mocker: MockerFixture):
    mock_client_instance = mocker.AsyncMock()
    mock_client_instance.admin.command = mocker.AsyncMock(side_effect=ConnectionFailure)

    mocker.patch("src.database.db.AsyncMongoClient", return_value=mock_client_instance)

    mock_init_beanie = mocker.patch("src.database.db.init_beanie")

    await init_db(models=[])

    mock_client_instance.admin.command.assert_called_once_with("ping")

    mock_init_beanie.assert_not_called()


@pytest.mark.asyncio
async def test_init_db_already_initialized(mocker: MockerFixture):
    """Test that init_db skips initialization if client already exists."""
    existing_client = mocker.AsyncMock()

    mocker.patch("src.database.db._client", existing_client)

    mock_client_class = mocker.patch("src.database.db.AsyncMongoClient")

    mock_init_beanie = mocker.patch("src.database.db.init_beanie")

    await init_db()

    mock_client_class.assert_not_called()

    mock_init_beanie.assert_not_called()


@pytest.mark.asyncio
async def test_init_db_with_models(mocker: MockerFixture):
    """Test database initialization with document models."""

    class MockUserModel:
        pass

    class MockEmailModel:
        pass

    mock_database = mocker.Mock()

    mock_client_instance = mocker.AsyncMock()
    mock_client_instance.admin.command = mocker.AsyncMock(return_value={"ok": 1})
    mock_client_instance.get_database = mocker.Mock(return_value=mock_database)

    mocker.patch("src.database.db.AsyncMongoClient", return_value=mock_client_instance)

    mock_init_beanie = mocker.patch(
        "src.database.db.init_beanie", new=mocker.AsyncMock(return_value=None)
    )

    test_models = [MockUserModel, MockEmailModel]
    await init_db(models=test_models)

    mock_init_beanie.assert_called_once_with(
        database=mock_database, document_models=test_models
    )


@pytest.mark.asyncio
async def test_close_db(mocker: MockerFixture):
    """Test closing database connection."""
    mock_client_instance = mocker.AsyncMock()
    mock_client_instance.close = mocker.AsyncMock()

    mocker.patch("src.database.db._client", mock_client_instance)

    await close_db()

    mock_client_instance.close.assert_called_once()


@pytest.mark.asyncio
async def test_close_db_no_client(mocker: MockerFixture):
    """Test closing database when no client exists."""
    mocker.patch("src.database.db._client", None)

    await close_db()


@pytest.mark.asyncio
async def test_get_client(mocker: MockerFixture):
    """Test getting the database client."""
    mock_client_instance = mocker.AsyncMock()
    mocker.patch("src.database.db._client", mock_client_instance)

    client = get_client()

    assert client is mock_client_instance


@pytest.mark.asyncio
async def test_get_session(mocker: MockerFixture):
    """Test getting a database session."""
    mock_client_instance = mocker.AsyncMock()
    mock_session = mocker.Mock()
    mock_client_instance.start_session = mocker.Mock(return_value=mock_session)

    mocker.patch("src.database.db._client", mock_client_instance)

    session = await get_session()

    mock_client_instance.start_session.assert_called_once()
    assert session is mock_session


@pytest.mark.asyncio
async def test_get_session_no_client(mocker: MockerFixture):
    """Test getting a session when no client exists."""
    mocker.patch("src.database.db._client", None)

    session = await get_session()

    assert session is None
