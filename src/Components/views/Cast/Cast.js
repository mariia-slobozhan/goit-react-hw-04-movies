import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieCastOpen } from "../../../services/movieSearchApi";
import actor_default from "../../../images/actor_default.png";

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    movieCastOpen(movieId).then((resp) => setCast(resp.data.cast));
  }, [movieId]);

  return (
    <ul>
      {movieCastOpen &&
        cast.map((el) => {
          return (
            <li key={el.id}>
              {el.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${el.profile_path}`}
                  alt={el.name}
                />
              ) : (
                <img src={actor_default} alt={el.name} />
              )}
              <p>{el.name}</p>
              <p>Character: {el.character}</p>
            </li>
          );
        })}
    </ul>
  );
}
