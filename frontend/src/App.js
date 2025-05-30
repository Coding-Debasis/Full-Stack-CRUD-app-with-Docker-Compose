import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}/items`);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const addItem = async () => {
    if (!name.trim()) return;
    try {
      await axios.post(`${API_BASE}/items`, { name });
      setName('');
      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE}/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Full Stack CRUD App</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={addItem} style={{ padding: '0.5rem 1rem' }}>
          Add
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item._id} style={{ marginBottom: '0.5rem' }}>
            {item.name}
            <button
              onClick={() => deleteItem(item._id)}
              style={{ marginLeft: '1rem', padding: '0.3rem 0.7rem' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
