import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Supplier, SupplierCreate } from '../types';

export const useSuppliers = () => {
  return useQuery<Supplier[]>('suppliers', async () => {
    const { data } = await axios.get('/api/suppliers');
    return data;
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newSupplier: SupplierCreate) => axios.post('/api/suppliers', newSupplier),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('suppliers');
      }
    }
  );
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedSupplier: { id: number; data: SupplierCreate }) =>
      axios.put(`/api/suppliers/${updatedSupplier.id}`, updatedSupplier.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('suppliers');
      }
    }
  );
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (supplierId: number) => axios.delete(`/api/suppliers/${supplierId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('suppliers');
      }
    }
  );
};
