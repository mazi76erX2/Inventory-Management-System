import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Category, CategoryCreate } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(`${API_URL}/categories`);
  return data;
};

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

const createCategory = async (newCategory: CategoryCreate): Promise<Category> => {
  const { data } = await axios.post(`${API_URL}/categories`, newCategory);
  return data;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<Category, Error, CategoryCreate>({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};

const updateCategory = async (updatedCategory: { id: number; data: CategoryCreate }): Promise<Category> => {
  const { data } = await axios.put(`${API_URL}/categories/${updatedCategory.id}`, updatedCategory.data);
  return data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<Category, Error, { id: number; data: CategoryCreate }>({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};

const deleteCategory = async (categoryId: number): Promise<void> => {
  await axios.delete(`${API_URL}/categories/${categoryId}`);
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
    },
  });
};
