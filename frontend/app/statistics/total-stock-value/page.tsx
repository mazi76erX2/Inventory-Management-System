// TODO: Implement the TotalStockValue component

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchTotalStockValue = async () => {
  const { data } = await axios.get(`${API_URL}/api/statistics/total_stock_value`);
  return data;
};

export default function TotalStockValue() {
  const { data, error, isLoading } = useQuery('totalStockValue', fetchTotalStockValue);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Total Stock Value</h1>
      <p>{data}</p>
    </div>
  );
}
