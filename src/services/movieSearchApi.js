import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const key = "627a47b9938dd67b6ad44cb66111cdb0";

export function trendingMovieSearch() {
  return axios
    .get(`trending/movie/week?api_key=${key}`)
    .then((response) => response);
}

export function searchMovieByKeyword(query) {
  return axios
    .get(
      `search/movie?api_key=${key}&page=1&query=${query}&include_adult=false`
    )
    .then((response) => response);
}

export function movieDetailsOpen(id) {
  return axios.get(`/movie/${id}?api_key=${key}`);
}
