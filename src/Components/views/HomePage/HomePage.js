import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { trendingMovieSearch } from "../../../services/movieSearchApi";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

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
                <Link
                  to={{
                    pathname: `movies/${el.id}`,
                    state: { from: { location, label: "Back to Home" } },
                  }}
                >
                  {el.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
