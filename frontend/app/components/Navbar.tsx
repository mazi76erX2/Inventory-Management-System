import React from 'react';
import Link from 'next/link';

import { createMockData } from '../../api/createMockData';

const Navbar = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // createMockData();
    alert('Mock data created successfully');
    // document.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Inventory Management</div>
        <div className="flex space-x-4">
          <Link href="/add-item" className="text-white">
            Add Item
          </Link>
          <Link href="/add-category" className="text-white">
            Add Category
          </Link>
          <Link href="/add-supplier" className="text-white">
            Add Supplier
          </Link>
          <Link href="/" className="text-white bg-blue-500 rounded px-1" onClick={handleSubmit}>
            Create Mock Data
          </Link>
          <div className="relative group">
            <button className="text-white">Statistics</button>
            <div className="absolute hidden group-hover:block bg-gray-700 p-2 mt-1 rounded">
              <Link href="/statistics/items" className="block text-white p-2">
                Item Statistics
              </Link>
              <Link href="/statistics/categories" className="block text-white p-2">
                Category Statistics
              </Link>
              <Link href="/statistics/suppliers" className="block text-white p-2">
                Supplier Statistics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
