import React, { useState } from 'react';
import { useAddItem } from '../../api/useItems';

const AddItemForm: React.FC = () => {
  const { mutate } = useAddItem();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const { categories, suppliers } = useInventory();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [supplierId, setSupplierId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, description, stock, category_id: categoryId, supplier_id: supplierId });
    setName('');
    setDescription('');
    setStock(0);
    setCategoryId(null);
    setSupplierId(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item Description"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        placeholder="Stock"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <select
        value={categoryId ?? ''}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        value={supplierId ?? ''}
        onChange={(e) => setSupplierId(Number(e.target.value))}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>Select Supplier</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
