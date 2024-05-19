import { useState } from 'react';
import { useCreateItem } from '../../api/useItems';

export default function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [supplierId, setSupplierId] = useState<number | null>(null);
  const { mutate: createItem } = useCreateItem();

  const handleSubmit = () => {
    createItem({ name, description, stock, category_id: categoryId, supplier_id: supplierId });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Category ID</label>
          <input
            type="number"
            value={categoryId || ''}
            onChange={(e) => setCategoryId(Number(e.target.value) || null)}
          />
        </div>
        <div>
          <label>Supplier ID</label>
          <input
            type="number"
            value={supplierId || ''}
            onChange={(e) => setSupplierId(Number(e.target.value) || null)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
      </form>
    </div>
  );
}
