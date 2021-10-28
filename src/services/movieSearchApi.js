import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const key = "627a47b9938dd67b6ad44cb66111cdb0";

export function trendingMovieSearch() {
  return axios
    .get(`trending/movie/week?api_key=${key}`)
    .then((response) => response);
}

//https://api.themoviedb.org/3/movie/550?api_key=627a47b9938dd67b6ad44cb66111cdb0

//627a47b9938dd67b6ad44cb66111cdb0
