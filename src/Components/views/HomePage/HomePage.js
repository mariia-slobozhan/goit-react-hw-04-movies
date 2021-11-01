import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { trendingMovieSearch } from "../../../services/movieSearchApi";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    trendingMovieSearch().then((resp) => {
      const data = resp.data.results;
      setMovies(data);
    });
  }, []);

  console.log(movies);

  return (
    <section className={s.section}>
      <ul className={s.list}>
        {trendingMovieSearch &&
          movies.map((el) => {
            return (
              <li className={s.item} key={el.id}>
                <Link
                  className={s.link}
                  to={{
                    pathname: `movies/${el.id}`,
                    state: { from: { location, label: "Back to Home" } },
                  }}
                >
                  <img
                    className={s.poster}
                    src={`https://image.tmdb.org/t/p/w300${el.poster_path}`}
                    alt={el.title}
                  />
                  <p className={s.title}>{el.title}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
