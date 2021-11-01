import { useState, useCallback, useEffect } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { searchMovieByKeyword } from "../../../services/movieSearchApi";
import SearchBar from "../SearchBar/SearchBar";
import poster_default from "../../../images/movie_poster_default.png";
import s from "./MoviesPage.module.css";

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

  console.log(movies);

  const handleSubmit = useCallback(
    (query) => {
      history.push({ ...location, search: `query=${query}` });
    },
    [history, location]
  );

  return (
    <section className={s.section}>
      <SearchBar onSubmit={handleSubmit} />
      <ul className={s.list}>
        {searchMovieByKeyword &&
          movies.map((movie) => {
            return (
              <li className={s.item} key={movie.id}>
                <Link
                  className={s.link}
                  to={{
                    pathname: `${url}/${movie.id}`,
                    state: {
                      from: { location, label: "Back to movies search" },
                    },
                  }}
                >
                  {movie.poster_path ? (
                    <img
                      className={s.poster}
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <img
                      className={s.poster}
                      src={poster_default}
                      alt={movie.title}
                    />
                  )}

                  <p className={s.title}>{movie.title}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
