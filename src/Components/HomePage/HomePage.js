import { useState, useEffect } from "react";
import { trendingMovieSearch } from "../../services/movieSearchApi";

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
            return <li key={el.id}>{el.title}</li>;
          })}
        <li>Movie</li>
      </ul>
    </section>
  );
}
