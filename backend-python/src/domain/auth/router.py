from http import HTTPStatus
from typing import Any, Optional
from fastapi import APIRouter
from src.domain.auth.schema import LoginRequest, LoginResponse, StatusResponse, TokenPayload, TokenType
from firebase_admin import auth as firebase_auth
from src.domain.auth.model import UserModel, UserTokenModel
from src.domain.auth.utils.token_utils import JWTRefreshToken, TokenFactory, JWTAccessToken
from src.core.config import settings
from uuid import uuid4
from src.domain.auth.deps.token_deps import get_access_token_factory, get_refresh_token_factory


router = APIRouter()

@router.post("/login/")
async def login(request: LoginRequest) -> Any:
    # verify token with firebase
    decoded_token = firebase_auth.verify_id_token(request.token)
    firebase_uid = decoded_token['uid']
    email = decoded_token.get('email')
    full_name = decoded_token.get('name')
    # check if user exists
    user = await UserModel.find_one(UserModel.firebase_uid == firebase_uid) # type: ignore[arg-type]
    if not user:
        # create new user
        user = UserModel(
            firebase_uid=firebase_uid,
            email=email,
            full_name=full_name,
            method=request.method
        )
        await user.insert()

        #Issue JWT access token and refresh token
        access_token_factory = get_access_token_factory()

        access_token = access_token_factory.create_token(
                payload = TokenPayload(
                    sub=str(user.id),
                    type=TokenType.ACCESS,
                    email=email,
            )
        )

        refresh_token_factory = get_refresh_token_factory()
            
        refresh_token = refresh_token_factory.create_token(
                payload = TokenPayload(
                    sub=str(user.id),
                    type=TokenType.REFRESH,
                    email=email,
            )
        )

        user_token = UserTokenModel(
            jti=uuid4(),
            user=user,
            access_token=access_token,
            refresh_token=refresh_token
        )
        await user_token.insert()

        #update the user tokens list
        await user.update(
            {"$push": {"tokens": user_token}}
        )

        if not access_token or not refresh_token:
            return LoginResponse(
                status=StatusResponse(
                    http_status=HTTPStatus.INTERNAL_SERVER_ERROR,
                    message="Failed to generate tokens"
                )
            )
        
        return LoginResponse(
            status=StatusResponse(
                http_status=HTTPStatus.OK,
                message="Login successful"
            ),
            access_token=access_token,
            refresh_token=refresh_token
        )
    
    else:
        return LoginResponse(
            status=StatusResponse(
                http_status=HTTPStatus.OK,
                message="User already exists"
            )
        )


    