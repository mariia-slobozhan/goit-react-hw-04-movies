import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";

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
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        onChange={handleChange}
        autoComplete="off"
        value={query}
        type="text"
        name="query"
        placeholder="search some movie"
        className={s.input}
      ></input>
      <button className={s.button}>Search</button>
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
