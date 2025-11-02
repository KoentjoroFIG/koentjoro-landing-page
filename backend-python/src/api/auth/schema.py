from enum import Enum


class AuthMethod(str, Enum):
    EMAIL = "email"
    GOOGLE = "google"
