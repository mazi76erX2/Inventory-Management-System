'use client';

import { useState } from 'react';
import { useCreateSupplier } from '../../api/useSuppliers';

export default function AddSupplier() {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const { mutate: createSupplier } = useCreateSupplier();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createSupplier({ name, contact_info: contactInfo });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Supplier</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            class="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Info</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            class="border border-gray-300 rounded-md w-full p-2"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Supplier</button>
      </form>
    </div>
  );
}
