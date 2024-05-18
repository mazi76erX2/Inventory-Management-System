from fastapi import APIRouter
from api.endpoints import items, categories, suppliers, statistics

api_router = APIRouter()

api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(suppliers.router, prefix="/suppliers", tags=["suppliers"])
api_router.include_router(statistics.router, prefix="/statistics", tags=["statistics"])
