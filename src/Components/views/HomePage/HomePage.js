import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { trendingMovieSearch } from "../../../services/movieSearchApi";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    trendingMovieSearch().then((resp) => {
      const data = resp.data.results;
      setMovies(data);
    });
  }, []);

  return (
    <section>
      <ul>
        {trendingMovieSearch &&
          movies.map((el) => {
            return (
              <li key={el.id}>
                <Link to={`movies/${el.id}`}>{el.title}</Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
