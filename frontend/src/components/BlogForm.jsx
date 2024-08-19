import { useField } from "../hooks";
import { addBlog } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

import Togglable from "./Togglable";

const BlogForm = () => {
  const [title, titleActions] = useField("text", "Write title here");
  const [author, authorActions] = useField("text", "Write author name here");
  const [url, urlActions] = useField("text", "Write URL here");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const createBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(addBlog(newBlog, user));

    titleActions.reset();
    authorActions.reset();
    urlActions.reset();
  };

  return (
    <div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <h3>Create a new blog:</h3>
        <form onSubmit={createBlog}>
          <div>
            Title: <input {...title} />
          </div>
          <div>
            Author: <input {...author} />
          </div>
          <div>
            URL: <input {...url} />
          </div>
          <button type="submit">Create</button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
