import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieCastOpen } from "../../../services/movieSearchApi";
import actor_default from "../../../images/actor_default.png";
import s from "./Cast.module.css";

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    movieCastOpen(movieId).then((resp) => setCast(resp.data.cast));
  }, [movieId]);

  return (
    <ul className={s.list}>
      {movieCastOpen &&
        cast.map((el) => {
          return (
            <li className={s.item} key={el.id}>
              {el.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${el.profile_path}`}
                  alt={el.name}
                />
              ) : (
                <img className={s.actor} src={actor_default} alt={el.name} />
              )}
              <p className={s.info}>{el.name}</p>
              <p className={s.info}>Character: {el.character}</p>
            </li>
          );
        })}
    </ul>
  );
}
