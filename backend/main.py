""" Description: Main entry point for the FastAPI application. """

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api import api_router
from backend.config import configure_logging, DEBUG, ALLOWED_HOSTS

configure_logging()

app = FastAPI(
    title="Inventory Management API",
    description="An API for managing inventory items, categories, and suppliers.",
    version="0.1.0",
    debug=DEBUG,
    host="0.0.0.0",
    port=8080,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
