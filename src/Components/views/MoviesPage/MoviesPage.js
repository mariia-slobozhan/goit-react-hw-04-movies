import { useState, useCallback, useEffect } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { searchMovieByKeyword } from "../../../services/movieSearchApi";
import SearchBar from "../SearchBar/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query") ?? "";
    if (query === "") {
      return;
    }
    searchMovieByKeyword(query).then((resp) => setMovies(resp.data.results));
  }, [location.search]);

  const handleSubmit = useCallback(
    (query) => {
      history.push({ ...location, search: `query=${query}` });
    },
    [history, location]
  );

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ul>
        {searchMovieByKeyword &&
          movies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: {
                      from: { location, label: "Back to movies search" },
                    },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
