import { useEffect } from "react";

import { notify } from "./reducers/notifReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, clearUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";

import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import SortMenu from "./components/SortMenu";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(clearUser());
    dispatch(notify({ message: "Successfully signed out", color: "green" }, 2));
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to BlogCatalog</h2>
        <Notification />
        <LoginForm />
        <br />
        <SignupForm />
      </div>
    );
  }

  return (
    <div>
      <h2>BlogCatalog</h2>
      <Notification />
      <p>
        {user.name} is signed in.{" "}
        <button onClick={handleLogout}>Log out</button>
      </p>
      <BlogForm />

      <br />
      <h3>Blogs</h3>
      <div>
        <SortMenu />
        <BlogList />
      </div>
    </div>
  );
};

export default App;
