import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
  };

  const handleCreate = async () => {
    if (!form.name) return alert("Name is required");
    await axios.post("http://localhost:5000/items", form);
    setForm({ name: "", description: "" });
    fetchItems();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await axios.put(`http://localhost:5000/items/${id}`, { name: newName });
      fetchItems();
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={handleCreate}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => handleUpdate(item._id)}>✏️</button>
            <button onClick={() => handleDelete(item._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
