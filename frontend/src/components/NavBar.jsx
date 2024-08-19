import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../reducers/userReducer";
import { notify } from "../reducers/notifReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      window.localStorage.removeItem("loggedBlogAppUser");
      dispatch(clearUser());
      dispatch(
        notify({ message: "Successfully signed out", color: "green" }, 2),
      );
    } else {
      navigate("/login");
    }
  };

  const label = user ? "Log out" : "Log in";

  return (
    <div>
      <NavLink to="/">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
      {user ? `${user.name} is signed in.` : ""}
      <button onClick={handleClick}>{label}</button>
    </div>
  );
};

export default NavBar;
