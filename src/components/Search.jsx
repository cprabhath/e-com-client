import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    onSearch(search);
  }, [search]);

  return (
    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
      <input
        className="form-control me-5"
        style={{ width: "500px" }}
        type="search"
        placeholder="Search by Product Name, Brand or Category"
        aria-label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
