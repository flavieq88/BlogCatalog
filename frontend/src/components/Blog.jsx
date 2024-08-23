import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";

import { useNavigate, Link } from "react-router-dom";

import { useField } from "../hooks";

const Blog = ({ blog }) => {
  const [extended, setExtended] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [comment, commentActions] = useField("text", "Add a comment");

  if (!blog) {
    return null;
  }

  const blogStyle = {
    width: "95%",
    paddingTop: 10,
    border: "solid",
    borderWidth: 1,
    borderColor: "gray",
    margin: "auto",
    background: extended ? "rgb(229, 231, 231)" : "white",
    borderRadius: 12,
    overflow: "hidden",
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
      navigate("/blogs");
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(comment.value, blog));
    commentActions.reset();
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    borderBottom: "1px dotted black",
  };

  return (
    <div style={blogStyle} className="blog">
      <h2>
        {blog.title}, by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} like{blog.likes !== 1 && "s"}
      <button onClick={() => handleLike(blog)} className="smallButton">
        Like
      </button>{" "}
      <br />
      Blog added by user{" "}
      <Link to={`/users/${blog.user.id}`} style={linkStyle}>
        {blog.user.username}
      </Link>{" "}
      <br />
      {blog.user.username === user.username && (
        <button onClick={() => handleDelete(blog)} className="deleteButton">
          Delete blog
        </button>
      )}
      <br />
      <strong style={{ fontSize: "large" }}>Comments:</strong>
      <button
        onClick={toggleExtended}
        className="smallButton"
        style={{ backgroundColor: "gray" }}
      >
        {label}
      </button>
      <div style={hiddenBlogStyle} className="extendedInfo">
        <p>
          {`${blog.comments.length} comment`}
          {blog.comments.length !== 1 && "s"}
        </p>
        {blog.comments.length === 0
          ? "Be the first to comment on this blog post!"
          : blog.comments.map((comment) => (
              <div key={comment.id}>
                {comment.text} --{" "}
                <Link to={`/users/${comment.user}`} style={linkStyle}>
                  {comment.username}
                </Link>
              </div>
            ))}
        <form onSubmit={handleComment}>
          <input {...comment} />
          <button type="submit" className="smallButton">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
