from pydantic import BaseModel, Field, Optional
from datetime import datetime


class ItemBase(BaseModel):
    name: str = Field(..., description="The item name")
    description: str = Field(None, description="The item description (optional)")
    stock: int = Field(..., description="The current stock level")
    category_id: int = Field(..., description="The ID of the associated category")
    supplier_id: int = Field(..., description="The ID of the associated supplier")

class ItemCreate(ItemBase):
    pass

class ItemUpdate(ItemBase):
    id: int

class ItemResponse(ItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class CategoryBase(BaseModel):
    name: str = Field(..., description="The category name")

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class SupplierBase(BaseModel):
    name: str = Field(..., description="The supplier name")
    contact_info: Optional[str] = Field(
        None, description="The supplier's contact information (optional)"
    )

class SupplierCreate(SupplierBase):
    pass

class SupplierResponse(SupplierBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class LowInventoryItemBase(BaseModel):
    id: int = Field(..., description="The item name")
    name: str = Field(..., description="The item name")
    description: str = Field(None, description="The item description (optional)")
    stock: int = Field(..., description="The current stock level")
    category_id: int = Field(..., description="The ID of the associated category")
    supplier_id: int = Field(..., description="The ID of the associated supplier")

    class Config:
        orm_mode = True

class LowInventoryItemResponse(LowInventoryItemBase):
    pass

class InventoryStatisticsBase(BaseModel):
    category_name: str = Field(..., description="The category name")
    total_stock: int = Field(..., description="The total stock level for the category")

    class Config:
        orm_mode = True

class InventoryStatisticsResponse(InventoryStatisticsBase):
    pass
