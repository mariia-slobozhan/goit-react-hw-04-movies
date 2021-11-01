import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.navigation}>
      <NavLink
        className={s.navlink}
        activeClassName={s.active_link}
        exact
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={s.navlink}
        activeClassName={s.active_link}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
