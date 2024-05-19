import React, { useMemo } from 'react';
import { useInventory } from '../context/InventoryContext';

interface ItemListProps {
  items: any[];
  onUpdate: (item: any) => void;
  onDelete: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = React.memo(({ items, onUpdate, onDelete }) => {
  const { categories, suppliers } = useInventory();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [selectedSupplier, setSelectedSupplier] = React.useState<string>('');

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      return (
        (selectedCategory ? item.category.name === selectedCategory : true) &&
        (selectedSupplier ? item.supplier.name === selectedSupplier : true)
      );
    });
  }, [items, selectedCategory, selectedSupplier]);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-1/2 border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Filter by Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
        <select
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          className="block w-1/2 border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Filter by Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {filteredItems.map(item => (
          <div key={item.id} className="p-4 border border-gray-300 rounded-md shadow-sm">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <div>
                <button
                  onClick={() => onUpdate(item)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm">{item.description}</p>
            <p className="mt-2 text-sm">Stock: {item.stock}</p>
            <p className="mt-2 text-sm">Category: {item.category.name}</p>
            <p className="mt-2 text-sm">Supplier: {item.supplier.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ItemList;
