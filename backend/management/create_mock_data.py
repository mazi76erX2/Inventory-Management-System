import asyncio
import random

from fastapi import FastAPI
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_session, engine
from models import Item, Category, Supplier, Base

from faker import Faker


app = FastAPI()


@app.on_event("startup")
async def startup():
    # Ensure the database is initialized
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


faker = Faker()


async def create_mock_categories(session: AsyncSession, num_categories: int):
    categories = [Category(name=faker.word()) for category in range(num_categories)]
    session.add_all(categories)
    await session.commit()
    return categories


async def create_mock_suppliers(session: AsyncSession, num_suppliers: int):
    suppliers = [
        Supplier(name=faker.company(), contact_info=faker.phone_number())
        for _ in range(num_suppliers)
    ]
    session.add_all(suppliers)
    await session.commit()
    return suppliers


async def create_mock_items(
    session: AsyncSession, num_items: int, categories, suppliers
):
    items = []
    for _ in range(num_items):
        item = Item(
            name=faker.word(),
            description=faker.sentence(),
            stock=random.randint(0, 100),
            category_id=random.choice(categories).id,
            supplier_id=random.choice(suppliers).id,
        )
        items.append(item)
    session.add_all(items)
    await session.commit()


async def main():
    async with get_session() as session:
        categories = await create_mock_categories(session, 10)
        suppliers = await create_mock_suppliers(session, 10)
        await create_mock_items(session, 50, categories, suppliers)


if __name__ == "__main__":
    asyncio.run(main())
