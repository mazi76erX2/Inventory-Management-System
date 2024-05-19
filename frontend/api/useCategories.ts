import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Category, CategoryCreate } from '../types';

export const useCategories = () => {
  return useQuery<Category[]>('categories', async () => {
    const { data } = await axios.get('/api/categories');
    return data;
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newCategory: CategoryCreate) => axios.post('/api/categories', newCategory),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      }
    }
  );
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedCategory: { id: number; data: CategoryCreate }) =>
      axios.put(`/api/categories/${updatedCategory.id}`, updatedCategory.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      }
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (categoryId: number) => axios.delete(`/api/categories/${categoryId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      }
    }
  );
};
