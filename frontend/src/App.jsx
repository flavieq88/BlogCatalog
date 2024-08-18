import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import SortMenu from "./components/SortMenu";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";

import { notify } from "./reducers/notifReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, clearUser, loginUser } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [sorting, setSorting] = useState("likes");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const timeNotif = 2; //length of time in s notification is displayed

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = [...blogs];
      sortedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, [user]);

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

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(loginUser(username, password));

    setUsername("");
    setPassword("");
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      await userService.signup({
        username: newUsername,
        name: newName,
        password: newPassword,
      });

      const user = await loginService.login({
        username: newUsername,
        password: newPassword,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      dispatch(
        notify(
          { message: `${user.name} successfully signed in`, color: "green" },
          timeNotif,
        ),
      );

      setUser(user);
      setNewUsername("");
      setNewPassword("");
      setNewName("");
    } catch (exception) {
      if (exception.response.data.error.includes("unique")) {
        dispatch(
          notify(
            { message: "Username already taken", color: "red" },
            timeNotif,
          ),
        );
      } else {
        dispatch(
          notify(
            { message: exception.response.data.error, color: "red" },
            timeNotif,
          ),
        );
      }
      setNewUsername("");
      setNewPassword("");
      setNewName("");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(clearUser());
    dispatch(
      notify({ message: "Successfully signed out", color: "green" }, timeNotif),
    );
  };

  const selectSort = (state) => {
    setSorting(state);
    const sortedBlogs = [...blogs];
    if (state === "likes") {
      sortedBlogs.sort((a, b) => b[state] - a[state]);
    } else {
      sortedBlogs.sort((a, b) => a[state].localeCompare(b[state]));
    }

    setBlogs(sortedBlogs);
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      const sortedBlogs = blogs.concat({ ...returnedBlog, user: user });
      if (sorting === "likes") {
        sortedBlogs.sort((a, b) => b[sorting] - a[sorting]);
      } else {
        sortedBlogs.sort((a, b) => a[sorting].localeCompare(b[sorting]));
      }

      setBlogs(sortedBlogs);

      dispatch(
        notify(
          {
            message: `New blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
            color: "green",
          },
          timeNotif,
        ),
      );
    } catch (exception) {
      if (exception.response.status === 401) {
        window.localStorage.removeItem("loggedBlogAppUser");
        setUser(null);
      }
      dispatch(
        notify(
          {
            message: "Failed to add blog",
            color: "red",
          },
          timeNotif,
        ),
      );
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to BlogCatalog</h2>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        <br />
        <SignupForm
          username={newUsername}
          password={newPassword}
          name={newName}
          handleUsernameChange={({ target }) => setNewUsername(target.value)}
          handlePasswordChange={({ target }) => setNewPassword(target.value)}
          handleNameChange={({ target }) => setNewName(target.value)}
          handleSubmit={handleSignup}
        />
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
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      <br />
      <h3>Blogs</h3>
      <div>
        <SortMenu onSelect={selectSort} />
        <BlogList />
      </div>
    </div>
  );
};

export default App;
