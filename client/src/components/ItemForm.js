import React, { useState } from "react";
import api from "../api/api";

function ItemForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/items", { name });
    setName("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ItemForm;