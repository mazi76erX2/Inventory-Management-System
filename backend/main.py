import os
import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv

from api import api_router
from .config import configure_logging

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

app = FastAPI(
    title="Inventory Management API",
    description="An API for managing inventory items, categories, and suppliers.",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    logging_level="warning",
    debug=os.getenv("DEBUG", False)
    host="0.0.0.0",
    port=8080,
    on_startup=lambda: print("Server started!"),
)

async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

configure_logging()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
