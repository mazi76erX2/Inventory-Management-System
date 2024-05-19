import React, { createContext, useContext, ReactNode } from 'react';
import { useCategories } from '../../api/useCategories';
import { useSuppliers } from '../../api/useSuppliers';

const InventoryContext = createContext(null);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();

  return (
    <InventoryContext.Provider value={{ categories, suppliers }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
