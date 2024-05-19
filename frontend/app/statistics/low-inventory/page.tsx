import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLowInventoryItems = async () => {
  const { data } = await axios.get('/api/statistics/low_inventory');
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
