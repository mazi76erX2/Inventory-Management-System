from fastapi import APIRouter

from .items import router as items_router
from .categories import router as categories_router
from .suppliers import router as suppliers_router
from .statistics import router as statistics_router


api_router = APIRouter()

api_router.include_router(items_router, prefix="/items", tags=["items"])
api_router.include_router(categories_router, prefix="/categories", tags=["categories"])
api_router.include_router(suppliers_router, prefix="/suppliers", tags=["suppliers"])
api_router.include_router(statistics_router, prefix="/statistics", tags=["statistics"])
