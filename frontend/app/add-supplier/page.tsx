import { useState } from 'react';
import { useCreateSupplier } from '../../api/useSuppliers';

export default function AddSupplier() {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const { mutate: createSupplier } = useCreateSupplier();

  const handleSubmit = () => {
    createSupplier({ name, contact_info: contactInfo });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add Supplier</h1>
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
          <label>Contact Info</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Supplier</button>
      </form>
    </div>
  );
}
