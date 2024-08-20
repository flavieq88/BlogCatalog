import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";

import { useNavigate } from "react-router-dom";

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
      navigate("/");
    }
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(comment.value, blog));
    commentActions.reset();
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
        <h4>Comments</h4>
        <p>
          {`${blog.comments.length} comment`}
          {blog.comments.length !== 1 && "s"}
        </p>
        {blog.comments.length === 0
          ? "Be the first to comment on this blog post!"
          : blog.comments.map((comment) => (
              <div key={comment.id}>
                {comment.text} - {comment.username}
              </div>
            ))}
        <form onSubmit={handleComment}>
          <input {...comment} />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
