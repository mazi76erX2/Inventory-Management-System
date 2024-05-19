import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Item, ItemCreate, ItemUpdate } from '../types';


export const useItems = () => {
  return useQuery<Item[]>('items', async () => {
    const { data } = await axios.get('/api/items');
    return data;
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newItem: ItemCreate) => axios.post('/api/items', newItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('items');
      }
    }
  );
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedItem: { id: number; data: ItemUpdate }) =>
      axios.put(`/api/items/${updatedItem.id}`, updatedItem.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('items');
      }
    }
  );
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (itemId: number) => axios.delete(`/api/items/${itemId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('items');
      }
    }
  );
};
