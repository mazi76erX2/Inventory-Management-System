'use client';

import React, { createContext, useContext } from 'react';
import { useCategories } from '../../api/useCategories';
import { useSuppliers } from '../../api/useSuppliers';
import { Category, Supplier } from '../../types';

interface InventoryContextProps {
  categories: Category[];
  suppliers: Supplier[];
}

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();

  return (
    <InventoryContext.Provider value={{ categories, suppliers }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextProps => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

// TODO: Update the ItemList component to use the InventoryContext
