from typing import Dict, List, Type

from beanie import Document


class ModelRegistration:
    __registered_model: Dict[str, Type[Document]] = {}

    @classmethod
    def register_model(
        cls: Type["ModelRegistration"], model_class: Type[Document]
    ) -> Type[Document]:
        """Decorator to register a model"""
        cls.__registered_model[model_class.__name__] = model_class
        return model_class

    @classmethod
    def get_registered_models(cls: Type["ModelRegistration"]) -> List[Type[Document]]:
        return list(cls.__registered_model.values())

    @classmethod
    def get_raw_registered_models(
        cls: Type["ModelRegistration"],
    ) -> Dict[str, Type[Document]]:
        return cls.__registered_model.copy()
