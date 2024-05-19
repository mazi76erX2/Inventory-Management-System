import React from 'react';
import { useSuppliers } from '../../api/useSuppliers';

const SupplierList: React.FC = () => {
  const { data: suppliers, isLoading, isError } = useSuppliers();

  if (isLoading) {
    return <div>Loading suppliers...</div>;
  }

  if (isError) {
    return <div>Error loading suppliers.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      <ul className="list-disc pl-5">
        {suppliers?.map((supplier) => (
          <li key={supplier.id}>{supplier.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
