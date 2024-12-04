import React, { useEffect, useState } from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import Pagination from "./components/Pagination";
import api from "./api/api";

function App() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchItems = async (page = 1) => {
    const res = await api.get(`/items?page=${page}&limit=5`);
    setItems(res.data.items);
    setTotalPages(res.data.pages);
    setCurrentPage(res.data.page);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Item Manager</h1>
      <ItemForm onAdd={fetchItems} />
      <ItemList items={items} onDelete={fetchItems} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={fetchItems} />
    </div>
  );
}

export default App;