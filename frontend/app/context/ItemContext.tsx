import { createContext, useContext, ReactNode, useState, useMemo } from 'react';

interface ItemContextType {
  selectedItemId: number | null;
  setSelectedItemId: (id: number | null) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const value = useMemo(
    () => ({ selectedItemId, setSelectedItemId }),
    [selectedItemId]
  );

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};
