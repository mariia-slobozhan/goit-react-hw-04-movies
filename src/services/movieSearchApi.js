import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const key = "627a47b9938dd67b6ad44cb66111cdb0";

export async function trendingMovieSearch() {
  const response = await axios.get(`trending/movie/week?api_key=${key}`);
  return response;
}

export async function searchMovieByKeyword(query) {
  const response = await axios.get(
    `search/movie?api_key=${key}&page=1&query=${query}&include_adult=false`
  );
  return response;
}

export async function movieDetailsOpen(id) {
  const response = await axios.get(`movie/${id}?api_key=${key}`);
  return response;
}

export async function movieCastOpen(id) {
  const response = await axios.get(
    `movie/${id}/credits?api_key=${key}&language=en-US`
  );
  return response;
}

export async function movieReviewOpen(id) {
  const response = await axios.get(
    `movie/${id}/reviews?api_key=${key}&language=en-US&page=1`
  );
  return response;
}

//https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
