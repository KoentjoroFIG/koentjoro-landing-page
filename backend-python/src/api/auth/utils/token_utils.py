from abc import ABC, abstractmethod
from datetime import datetime, timedelta, timezone
from typing import Optional, Self

import jwt
from pydantic import SecretStr


class TokenStrategy(ABC):
    """
    Abstract base class for token strategies.
    """

    @abstractmethod
    def encode(self: Self, payload: dict) -> Optional[str]:
        """
        Encode the given payload into a token.
        """
        pass

    @abstractmethod
    def decode(self: Self, token: str) -> Optional[dict]:
        """
        Decode the given token into a payload.
        """
        pass


class BaseJWT:
    """
    Base class for JWT operations.
    """

    def __add_exp(self: Self, payload: dict, expires_in: int) -> dict:
        """
        Add expiration time to the payload.

        Args:
            payload (dict): The original payload.
            expires_in (int): Expiration time in seconds.

        Returns:
            dict: Payload with expiration time added.
        """
        payload = payload.copy()
        payload["exp"] = datetime.now(timezone.utc) + timedelta(seconds=expires_in)
        return payload

    def __encode(
        self: Self, payload: dict, secret: SecretStr, algorithm: str, expires_in: int
    ) -> Optional[str]:
        """
        Encode the payload into a JWT token.

        Args:
            payload (dict): The payload to encode.
            secret (SecretStr): The secret key for encoding.
            algorithm (str): The algorithm to use for encoding.
            expires_in (int): Expiration time in seconds.

        Returns:
            Optional[str]: Encoded JWT token or None if an error occurs.
        """
        try:
            return jwt.encode(
                self.__add_exp(payload, expires_in),
                secret.get_secret_value(),
                algorithm=algorithm,
            )
        except Exception as e:
            print(f"Error encoding token: {e}")
            return None

    def __decode(
        self: Self, token: str, secret: SecretStr, algorithm: str
    ) -> Optional[dict]:
        """
        Decode the JWT token into a payload.

        Args:
            token (str): The JWT token to decode.
            secret (SecretStr): The secret key for decoding.
            algorithm (str): The algorithm to use for decoding.

        Returns:
            Optional[dict]: Decoded payload or None if an error occurs.
        """
        try:
            return jwt.decode(token, secret.get_secret_value(), algorithms=[algorithm])
        except jwt.ExpiredSignatureError:
            print(f"Token has expired: {token}")
        except jwt.InvalidTokenError:
            print(f"Invalid token: {token}")
        return None


class JWTAccessToken(TokenStrategy, BaseJWT):
    """
    Class for handling JWT access tokens.

    Args:
        secret_key (SecretStr): The secret key for encoding and decoding.
        algorithm (str): The algorithm to use for encoding and decoding.
        expires_in (int): Expiration time in seconds.
    """

    def __init__(
        self: Self, secret_key: SecretStr, algorithm: str, expires_in: int
    ) -> None:
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.expires_in = expires_in

    def encode(self: Self, payload: dict) -> Optional[str]:
        """
        Encode the given payload into a JWT access token.

        Args:
            payload (dict): The payload to encode.

        Returns:
            Optional[str]: Encoded JWT access token or None if an error occurs.
        """
        return self.__encode(payload, self.secret_key, self.algorithm, self.expires_in)

    def decode(self: Self, token: str) -> Optional[dict]:
        """
        Decode the given JWT access token into a payload.

        Args:
            token (str): The JWT access token to decode.

        Returns:
            Optional[dict]: Decoded payload or None if an error occurs.
        """
        return self.__decode(token, self.secret_key, self.algorithm)


class JWTRefreshToken(TokenStrategy, BaseJWT):
    """
    Class for handling JWT refresh tokens.

    Args:
        secret_key (SecretStr): The secret key for encoding and decoding.
        algorithm (str): The algorithm to use for encoding and decoding.
        expires_in (int): Expiration time in seconds.
    """

    def __init__(
        self: Self, secret_key: SecretStr, algorithm: str, expires_in: int
    ) -> None:
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.expires_in = expires_in

    def encode(self: Self, payload: dict) -> Optional[str]:
        """
        Encode the given payload into a JWT refresh token.

        Args:
            payload (dict): The payload to encode.

        Returns:
            Optional[str]: Encoded JWT refresh token or None if an error occurs.
        """
        return self.__encode(payload, self.secret_key, self.algorithm, self.expires_in)

    def decode(self: Self, token: str) -> Optional[dict]:
        """
        Decode the given JWT refresh token into a payload.

        Args:
            token (str): The JWT refresh token to decode.

        Returns:
            Optional[dict]: Decoded payload or None if an error occurs.
        """
        return self.__decode(token, self.secret_key, self.algorithm)


class TokenFactory:
    """
    Factory class for creating and verifying tokens using different strategies.

    Args:
        strategy (TokenStrategy): The token strategy to use.
    """

    def __init__(self: Self, strategy: TokenStrategy) -> None:
        self.strategy = strategy

    def create_token(self: Self, data: dict) -> Optional[str]:
        """
        Create a token using the specified strategy.

        Args:
            data (dict): The payload data for the token.

        Returns:
            Optional[str]: The created token or None if an error occurs.
        """
        return self.strategy.encode(data)

    def verify_token(self: Self, token: str) -> Optional[dict]:
        """
        Verify a token using the specified strategy.

        Args:
            token (str): The token to verify.

        Returns:
            Optional[dict]: Decoded payload or None if an error occurs.
        """
        return self.strategy.decode(token)
