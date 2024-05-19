import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCategoryStock = async () => {
  const { data } = await axios.get('/api/statistics/category_stock');
  return data;
};

export default function CategoryStock() {
  const { data, error, isLoading } = useQuery('categoryStock', fetchCategoryStock);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Category Stock</h1>
      <ul>
        {data.map((stat) => (
          <li key={stat.category_name}>
            {stat.category_name} - {stat.total_stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
