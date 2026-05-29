from fastapi import HTTPException, status


class AuthException:
    INVALID_CREDENTIALS = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid email or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

    INVALID_TOKEN = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    TOKEN_EXPIRED = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token has expired",
        headers={"WWW-Authenticate": "Bearer"},
    )

    TOKEN_REVOKED = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token has been revoked",
        headers={"WWW-Authenticate": "Bearer"},
    )

    USER_NOT_FOUND = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
    )

    USER_ALREADY_EXISTS = HTTPException(
        status_code=status.HTTP_409_CONFLICT,
        detail="A user with this email already exists",
    )

    EMAIL_NOT_VERIFIED = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Email address has not been verified",
    )

    FIREBASE_ERROR = HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail="Authentication provider error",
    )
