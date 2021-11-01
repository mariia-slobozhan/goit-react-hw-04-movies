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
import s from "./MovieDetailsPage.module.css";
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
    <section className={s.section}>
      <button className={s.button} type="button" onClick={onGoBack}>
        {location?.state?.from?.label ?? "Back"}
      </button>
      <div className={s.movie_details}>
        <div className={s.info}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.label}>
            User Score: <span className={s.text}>{vote_average * 10} %</span>
          </p>
          <p className={s.label}>
            Overview: <span className={s.text}>{overview}</span>
          </p>
          <p className={s.label}>
            Genres:
            {genres &&
              genres.map((genre) => {
                return (
                  <span key={genre.id} className={s.text}>
                    {genre.name}
                  </span>
                );
              })}
          </p>
        </div>
        <img src={poster} alt={title} className={s.poster} />
      </div>
      <div>
        <h2 className={s.title}>Additional information</h2>
        <NavLink
          className={s.link}
          activeClassName={s.active_link}
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
          className={s.link}
          activeClassName={s.active_link}
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
    </section>
  );
}
