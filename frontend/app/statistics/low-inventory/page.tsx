// TODO: Implement the Low Inventory page

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchLowInventoryItems = async () => {
  const { data } = await axios.get(`${API_URL}/api/statistics/low_inventory`);
  return data;
};

export default function LowInventory() {
  const { data, error, isLoading } = useQuery('lowInventoryItems', fetchLowInventoryItems);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Low Inventory Items</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
