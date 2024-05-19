import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Supplier, SupplierCreate } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchSuppliers = async (): Promise<Supplier[]> => {
  const { data } = await axios.get(`${API_URL}/suppliers`);
  return data;
};

export const useSuppliers = () => {
  return useQuery<Supplier[], Error>({
    queryKey: ['suppliers'],
    queryFn: fetchSuppliers,
  });
};

const createSupplier = async (newSupplier: SupplierCreate): Promise<Supplier> => {
  const { data } = await axios.post(`${API_URL}/suppliers`, newSupplier);
  return data;
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation<Supplier, Error, SupplierCreate>({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
  });
};

const updateSupplier = async (updatedSupplier: { id: number; data: SupplierCreate }): Promise<Supplier> => {
  const { data } = await axios.put(`${API_URL}/suppliers/${updatedSupplier.id}`, updatedSupplier.data);
  return data;
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation<Supplier, Error, { id: number; data: SupplierCreate }>({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
  });
};

const deleteSupplier = async (supplierId: number): Promise<void> => {
  await axios.delete(`${API_URL}/suppliers/${supplierId}`);
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
    },
  });
};
