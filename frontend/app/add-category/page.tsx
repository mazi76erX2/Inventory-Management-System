'use client';

import { useState } from 'react';
import { useCreateCategory } from '../../api/useCategories';

export default function AddCategory() {
  const [name, setName] = useState('');
  const { mutate: createCategory } = useCreateCategory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createCategory({ name });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            class="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Category</button>
      </form>
    </div>
  );
}
