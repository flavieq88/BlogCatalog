import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [extended, setExtended] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 5,
    background: extended ? "lightgrey" : "white",
  };

  const hiddenBlogStyle = {
    display: extended ? "" : "none",
  };

  const label = extended ? "Hide" : "View";

  const toggleExtended = () => {
    setExtended(!extended);
  };

  const handleLike = (blog) => {
    dispatch(likeBlog({ ...blog, user: blog.user }));
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title}, by {blog.author}{" "}
      <button onClick={toggleExtended}>{label}</button> <br />
      <div style={hiddenBlogStyle} className="extendedInfo">
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} like{blog.likes !== 1 && "s"}{" "}
        <button onClick={() => handleLike(blog)}>Like</button>
        <br />
        Blog added by user {blog.user.username} <br />
        {blog.user.username === user.username && (
          <button onClick={() => handleDelete(blog)}>Delete blog</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
