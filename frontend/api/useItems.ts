import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Item, ItemCreate, ItemUpdate } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchItems = async (): Promise<Item[]> => {
  const { data } = await axios.get(`${API_URL}/items`);
  return data;
};

export const useItems = () => {
  return useQuery<Item[], Error>({
    queryKey: ['items'],
    queryFn: fetchItems,
  });
};

const createItem = async (newItem: ItemCreate): Promise<Item> => {
  const { data } = await axios.post(`${API_URL}/items`, newItem);
  return data;
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, ItemCreate>({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    },
  });
};

const updateItem = async (updatedItem: { id: number; data: ItemUpdate }): Promise<Item> => {
  const { data } = await axios.put(`${API_URL}/items/${updatedItem.id}`, updatedItem.data);
  return data;
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, { id: number; data: ItemUpdate }>({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    },
  });
};

const deleteItem = async (itemId: number): Promise<void> => {
  await axios.delete(`${API_URL}/items/${itemId}`);
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    },
  });
};
