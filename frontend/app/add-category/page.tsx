import { useState } from 'react';
import { useCreateCategory } from '../../api/useCategories';

export default function AddCategory() {
  const [name, setName] = useState('');
  const { mutate: createCategory } = useCreateCategory();

  const handleSubmit = () => {
    createCategory({ name });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Category</h1>
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
        <button type="submit" className="btn btn-primary">Add Category</button>
      </form>
    </div>
  );
}
