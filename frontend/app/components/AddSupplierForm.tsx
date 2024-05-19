import React, { useState } from 'react';

interface SupplierFormProps {
  onSubmit: (supplier: any) => void;
}

const AddSupplierForm: React.FC<SupplierFormProps> = React.memo(({ onSubmit }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, contact_info: contactInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Info</label>
        <input
          type="text"
          id="contactInfo"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Supplier</button>
    </form>
  );
});

export default AddSupplierForm;
