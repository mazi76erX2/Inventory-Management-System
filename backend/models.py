from typing import Optional

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class TimestampMixin:
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(),
                        onupdate=func.now())

class Item(Base, TimestampMixin):
    __tablename__ = "items"

    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String, nullable=False)
    description: str = Column(String)
    stock: int = Column(Integer, nullable=False)
    category_id: int = Column(Integer, ForeignKey("categories.id"))
    supplier_id: int = Column(Integer, ForeignKey("suppliers.id"))

    category = relationship("Category", backref="items")
    supplier = relationship("Supplier", backref="items")


class Category(Base, TimestampMixin):
    __tablename__ = "categories"

    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String, nullable=False)


class Supplier(Base, TimestampMixin):
    __tablename__ = "suppliers"

    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String, nullable=False)
    contact_info: str = Column(String, nullable=True)
