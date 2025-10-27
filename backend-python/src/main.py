from fastapi import FastAPI
from src.core.config import settings
from src.database.db import init_db, close_db
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("Database initialized")
    yield
    await close_db()
    print("Database disconnected")

def init_app():
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
    async def health_check():
        return {"status": "All praise to Allah"}

    return app

app = init_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="localhost",
        port=1911,
        reload=True
    )