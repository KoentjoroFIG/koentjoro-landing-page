from typing import Generator

import pytest
from beanie import Document
from pytest_mock import MockerFixture
from src.utils.model_registration import ModelRegistration


@pytest.fixture(autouse=True)
def reset_db_client(mocker: MockerFixture) -> Generator[None, None]:
    original_models = ModelRegistration.get_raw_registered_models()
    yield
    mocker.patch.object(
        ModelRegistration, "_ModelRegistration__registered_model", original_models
    )


def test_register_model_and_get_registered_models():
    @ModelRegistration.register_model
    class DummyModel(Document):
        pass

    registered = ModelRegistration.get_registered_models()
    assert DummyModel in registered


def test_get_raw_registered_models():
    @ModelRegistration.register_model
    class AnotherDummyModel(Document):
        pass

    ModelRegistration.register_model(AnotherDummyModel)
    raw = ModelRegistration.get_raw_registered_models()
    assert "AnotherDummyModel" in raw
    assert raw["AnotherDummyModel"] is AnotherDummyModel
