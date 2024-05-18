import os
import logging
from fastapi.logger import logger as fastapi_logger

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:postgres@db/inventory-management-system"
)

LOGGING_FORMAT = "%(levelname)s: %(name)s: %(message)s"

def configure_logging():
    logging.basicConfig(level=logging.INFO, format=LOGGING_FORMAT)
    fastapi_logger.setLevel(logging.INFO)

configure_logging()
