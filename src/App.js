import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import HomePage from "./Components/views/HomePage/HomePage";
import MoviesPage from "./Components/views/MoviesPage/MoviesPage";
import MovieDetailsPage from "./Components/views/MovieDetailsPage/MovieDetailsPage";

function App() {
  return (
    <div className="App">
      <Navigation />

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
    </div>
  );
}

export default App;
