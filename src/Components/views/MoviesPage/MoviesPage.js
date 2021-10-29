import { useState, useCallback, useEffect } from "react";
// import {Switch, Route} from 'react-router-dom'
import { Link, useRouteMatch } from "react-router-dom";
import { searchMovieByKeyword } from "../../../services/movieSearchApi";
import SearchBar from "../SearchBar/SearchBar";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    if (query === "") {
      return;
    }
    searchMovieByKeyword(query).then((resp) => setMovies(resp.data.results));
  }, [query]);

  const handleSubmit = useCallback((query) => {
    setQuery(query);
  }, []);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
