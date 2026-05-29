from firebase_admin import auth as firebase_auth

from src.core.logger import logger_main as logger


def verify_firebase_id_token(id_token: str) -> dict | None:
    """Verify a Firebase ID token and return the decoded claims."""
    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        return decoded_token
    except firebase_auth.ExpiredIdTokenError:
        logger.warning("Firebase ID token has expired")
        return None
    except firebase_auth.InvalidIdTokenError:
        logger.warning("Invalid Firebase ID token")
        return None
    except Exception as e:
        logger.error(f"Error verifying Firebase ID token: {e}")
        return None


def get_firebase_user(uid: str) -> dict | None:
    """Get a Firebase user by UID."""
    try:
        user = firebase_auth.get_user(uid)
        return {
            "uid": user.uid,
            "email": user.email,
            "display_name": user.display_name,
            "email_verified": user.email_verified,
            "photo_url": user.photo_url,
        }
    except firebase_auth.UserNotFoundError:
        logger.warning(f"Firebase user not found: {uid}")
        return None
    except Exception as e:
        logger.error(f"Error getting Firebase user: {e}")
        return None
