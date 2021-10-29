import { useState, useCallback } from "react";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback((e) => {
    setQuery(e.target.value.toLowerCase());
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (query.trim() === "") {
        return;
      }
      onSubmit(query);
    },
    [onSubmit, query]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        autoComplete="off"
        value={query}
        type="text"
        name="query"
        placeholder="search some movie"
      ></input>
      <button>Search</button>
    </form>
  );
}
