from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from src.core.config import settings
from src.database.db import close_db, init_db

from .utils import get_health_status


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    await init_db()
    yield
    await close_db()


def init_app() -> FastAPI:
    app = FastAPI(
        title="KoentjoroProfile",
        description="""
            This is portofolio page of Koentjoro and also reverse hiring portal
        """,
        version="1.0.0",
        debug=True if settings.APP_STAGE == "development" else False,
        lifespan=lifespan,
    )

    @app.get("/health")
    async def health_check() -> dict:
        return await get_health_status()

    return app


app = init_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="localhost", port=1911, reload=True)
