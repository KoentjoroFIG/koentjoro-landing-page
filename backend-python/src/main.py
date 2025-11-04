from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.database.db import DatabaseManager

from .utils.monitor import MonitorUtils


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    await DatabaseManager.init_db()
    yield
    await DatabaseManager.close_db()


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
        return await MonitorUtils.get_health_status()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["localhost:1911", "http://localhost:1911"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = init_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="localhost", port=1911, reload=True)
