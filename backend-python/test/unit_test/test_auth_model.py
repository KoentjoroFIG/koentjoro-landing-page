import pytest
from pydantic import ValidationError
from pytest_mock import MockerFixture

from src.api.auth.model import UserModel
from src.api.auth.schema import AuthMethod


@pytest.fixture(autouse=True)
def mock_user(mocker: MockerFixture):
    mocker.patch.object(UserModel, "get_pymongo_collection", return_value=None)


def test_user_creation_with_all_fields(mocker: MockerFixture):
    user = UserModel(
        username="testuser",
        email="test@example.com",
        method=AuthMethod.EMAIL,
        is_verified=True,
    )
    assert user.username == "testuser"
    assert user.email == "test@example.com"
    assert user.method == AuthMethod.EMAIL
    assert user.is_verified is True


def test_user_creation_with_defaults():
    user = UserModel(email="test@example.com")
    assert user.username is None
    assert user.email == "test@example.com"
    assert user.method == AuthMethod.EMAIL
    assert user.is_verified is False


def test_invalid_email_raises_validation_error():
    with pytest.raises(ValidationError):
        UserModel(email="invalid-email")


def test_username_is_optional():
    user = UserModel(email="test@example.com", method=AuthMethod.EMAIL)
    assert user.username is None
