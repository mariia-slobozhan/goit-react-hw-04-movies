import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieReviewOpen } from "../../../services/movieSearchApi";
import Loader from "../../Loader/Loader";

export default function Reviews() {
  const [review, setReview] = useState([]);
  const [status, setStatus] = useState("pending");
  const { movieId } = useParams();

  useEffect(() => {
    setStatus("pending");
    movieReviewOpen(movieId)
      .then((resp) => setReview(resp.data.results))
      .finally(setStatus("complete"));
  }, [movieId]);

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "complete") {
    return (
      <>
        <h2>{review.length === 0 && "There are not reviews for this movie"}</h2>
        <ul>
          {review &&
            review !== [] &&
            review.map((rew) => {
              return (
                <li key={rew.id}>
                  <h2>Author: {rew.author}</h2>
                  <p>Review: {rew.content}</p>
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}
