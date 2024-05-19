'use client';

import { useState } from 'react';
import { useCreateItem } from '../../api/useItems';
import { useCategories } from '../../api/useCategories';
import { useSuppliers } from '../../api/useSuppliers';

export default function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [supplierId, setSupplierId] = useState<number | null>(null);

  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();
  const { mutate: createItem } = useCreateItem();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (categoryId && supplierId) {
      createItem({ name, description, stock, category_id: categoryId, supplier_id: supplierId });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Item</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Item Description"
            class="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            class="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={categoryId || ''}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
            class="border border-gray-300 rounded-md w-full p-2"
          >
            <option value="" disabled>Select Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <select
            value={supplierId || ''}
            onChange={(e) => setSupplierId(Number(e.target.value))}
            required
            class="border border-gray-300 rounded-md w-full p-2"
          >
            <option value="" disabled>Select Supplier</option>
            {suppliers?.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Item</button>
      </form>
    </div>
  );
}
