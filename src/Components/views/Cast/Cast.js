import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieCastOpen } from "../../../services/movieSearchApi";
import actor_default from "../../../images/actor_default.jpg";

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    movieCastOpen(movieId).then((resp) => setCast(resp.data.cast));
  }, [movieId]);

  console.log(cast);
  return (
    <div>
      {movieCastOpen &&
        cast.map((el) => {
          if (el) {
            return (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w300${el.profile_path}`}
                  alt={el.name}
                />
                <p>{el.name}</p>
                <p>{el.character}</p>
              </>
            );
          }
        })}
    </div>
  );
}
