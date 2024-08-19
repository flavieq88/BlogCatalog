import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../reducers/userReducer";
import { notify } from "../reducers/notifReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(clearUser());
    dispatch(notify({ message: "Successfully signed out", color: "green" }, 2));
  };

  const label = user ? "Log out" : "Log in";

  return (
    <div>
      <NavLink to="/">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
      {`${user.name} is signed in.`}
      <button onClick={handleLogout}>{label}</button>
    </div>
  );
};

export default NavBar;
