import { useState, useEffect, lazy, Suspense } from "react";
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Loader from "../../Loader/Loader";
import { movieDetailsOpen } from "../../../services/movieSearchApi";
import poster_default from "../../../images/movie_poster_default.png";
const Cast = lazy(() =>
  import("../Cast/Cast.js" /* webpackChunkName: "cast" */)
);
const Reviews = lazy(() =>
  import("../Reviews/Reviews.js" /* webpackChunkName: "review" */)
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [movie, setMovie] = useState({});
  const { title, genres, vote_average, overview, poster_path } = movie;
  let poster = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : poster_default;

  useEffect(() => {
    movieDetailsOpen(movieId).then((resp) => setMovie(resp.data));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      <button type="button" onClick={onGoBack}>
        {location?.state?.from?.label ?? "Back"}
      </button>
      <div>
        <img src={poster} alt={title} />
        <div>
          <h1>{title}</h1>
          <p>
            User Score: <span>{vote_average * 10} %</span>
          </p>
          <p>
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
        <div>
          <h2>Additional information</h2>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: {
                from: {
                  location: location?.state?.from?.location ?? "/",
                  label: location?.state?.from?.label ?? "Back to Home",
                },
              },
            }}
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: {
                  location: location?.state?.from?.location ?? "/",
                  label: location?.state?.from?.label ?? "Back to Home",
                },
              },
            }}
          >
            Reviews
          </NavLink>
        </div>

        <Suspense fallback={<Loader />}>
          <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
          <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
        </Suspense>
      </div>
    </>
  );
}
