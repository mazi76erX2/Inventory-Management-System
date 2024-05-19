import React from 'react';
import { useCategories } from '../../api/useCategories';

const CategoryList: React.FC = () => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="list-disc pl-5">
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
