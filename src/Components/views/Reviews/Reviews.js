import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { movieReviewOpen } from "../../../services/movieSearchApi";
import Loader from "../../Loader/Loader";
import s from "./Reviews.module.css";

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
      <section className={s.reviews}>
        <h2 className={s.info}>
          {review.length === 0 && "There are not reviews for this movie"}
        </h2>
        <ul className={s.list}>
          {review &&
            review !== [] &&
            review.map((rew) => {
              return (
                <li className={s.item} key={rew.id}>
                  <h2 className={s.author}>Author: {rew.author}</h2>
                  <p className={s.review}>Review: {rew.content}</p>
                </li>
              );
            })}
        </ul>
      </section>
    );
  }
}
