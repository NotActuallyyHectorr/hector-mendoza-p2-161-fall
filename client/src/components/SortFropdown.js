import React from "react";

function SortDropdown({ onSort }) {
  const handleChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Sort by</option>
      <option value="asc">Name (A-Z)</option>
      <option value="desc">Name (Z-A)</option>
    </select>
  );
}

export default SortDropdown;
