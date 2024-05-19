export interface Item {
    id: number;
    name: string;
    description?: string;
    stock: number;
    category_id?: number;
    supplier_id?: number;
    created_at: string;
    updated_at: string;
}

export interface ItemCreate {
    name: string;
    description?: string;
    stock: number;
    category_id?: number;
    supplier_id?: number;
}

export interface ItemUpdate {
    name?: string;
    description?: string;
    stock?: number;
    category_id?: number;
    supplier_id?: number;
}

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryCreate {
    name: string;
}

export interface Supplier {
    id: number;
    name: string;
    contact_info?: string;
    created_at: string;
    updated_at: string;
}

export interface SupplierCreate {
    name: string;
    contact_info?: string;
}

export interface InventoryStatistics {
    category_name: string;
    total_stock: number;
}

export interface LowInventoryItem {
    id: number;
    name: string;
    stock: number;
}
