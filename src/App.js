import "./App.css";
import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Loader from "./Components/Loader/Loader";
const HomePage = lazy(() =>
  import(
    "./Components/views/HomePage/HomePage.js" /* webpackChunkName: "home" */
  )
);
const MoviesPage = lazy(() =>
  import(
    "./Components/views/MoviesPage/MoviesPage.js" /* webpackChunkName: "movies-main" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    "./Components/views/MovieDetailsPage/MovieDetailsPage.js" /* webpackChunkName: "movie-details" */
  )
);

function App() {
  return (
    <div className="App">
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
