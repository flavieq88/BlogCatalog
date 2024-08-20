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

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
      <div style={{ float: "right" }}>
        {`${user.name} is signed in `}
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default NavBar;
