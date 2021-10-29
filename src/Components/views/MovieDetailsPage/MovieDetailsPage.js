import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieDetailsOpen } from "../../../services/movieSearchApi";
import poster_default from "../../../images/movie_poster_default.png";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const { title, genres, vote_average, overview, poster_path } = movie;
  let poster = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : poster_default;
  console.log(movie);

  useEffect(() => {
    movieDetailsOpen(movieId).then((resp) => setMovie(resp.data));
  }, [movieId]);

  return (
    <div>
      <img src={poster} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>
          User Score: <span>{vote_average * 10} %</span>{" "}
        </p>
        <p>
          {" "}
          Owerview: <span>{overview}</span>
        </p>
        <p>
          Genres:
          {genres &&
            genres.map((genre) => {
              return <span key={genre.id}>{genre.name}</span>;
            })}
        </p>
      </div>
    </div>
  );
}
