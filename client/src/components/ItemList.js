import React, { useState } from "react";
import api from "../api/api";

function ItemList({ items, onUpdate, onDelete }) {
  const [editingItem, setEditingItem] = useState(null);
  const [newName, setNewName] = useState("");

  const handleUpdate = async () => {
    await api.put(`/items/${editingItem._id}`, { name: newName });
    setEditingItem(null);
    onUpdate();
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {editingItem?._id === item._id ? (
            <div>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingItem(null)}>Cancel</button>
            </div>
          ) : (
            <>
              {item.name} 
              <button onClick={() => setEditingItem(item)}>Edit</button>
              <button onClick={() => onDelete(item._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
