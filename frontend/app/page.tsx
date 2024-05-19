import { useItems } from '../api/useItems';
import { useCategories } from '../api/useCategories';
import { useSuppliers } from '../api/useSuppliers';


export default function Home() {
  const { data: items, isLoading: isItemsLoading } = useItems();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: suppliers, isLoading: isSuppliersLoading } = useSuppliers();

  if (isItemsLoading || isCategoriesLoading || isSuppliersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Inventory Management System</h1>

      <h2 className="text-xl font-bold mt-4">Items</h2>
      <ul>
        {items?.map(item => (
          <li key={item.id}>{item.name} - Stock: {item.stock}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4">Categories</h2>
      <ul>
        {categories?.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4">Suppliers</h2>
      <ul>
        {suppliers?.map(supplier => (
          <li key={supplier.id}>{supplier.name}</li>
        ))}
      </ul>
    </div>
  );
}
