from contextlib import asynccontextmanager
from typing import AsyncGenerator

import firebase_admin
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.core.logger import logger_config
from src.core.logger import logger_main as logger
from src.domain import router as domain_router

from .utils.monitor import MonitorUtils


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    try:
        logger_config.setup_logger()
        # await DatabaseManager.init_db()
        default_app = firebase_admin.initialize_app()
    except Exception as e:
        logger.critical(f"Error during startup: {e}")
        raise e
    yield
    try:
        # await DatabaseManager.close_db()
        firebase_admin.delete_app(default_app)
        logger.info("Application shutdown completed successfully.")
        logger_config.stop_logger()
    except Exception as e:
        logger.critical(f"Error during shutdown: {e}")
        raise e


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

    app.include_router(domain_router, prefix="/api")

    return app


app = init_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="localhost", port=1911, reload=True)
