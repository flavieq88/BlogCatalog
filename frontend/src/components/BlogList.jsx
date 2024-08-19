import { useSelector } from "react-redux";

import SortMenu from "./SortMenu";
import BlogForm from "./BlogForm";

import { Link } from "react-router-dom";

export const SingleBlog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 5,
    background: "white",
  };
  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}, by {blog.author}
      </Link>
    </div>
  );
};

const BlogList = () => {
  const blogs = useSelector((state) => {
    const list = [...state.blogs];
    if (state.filter === "likes") {
      return list.sort((a, b) => b[state.filter] - a[state.filter]);
    } else {
      return list.sort((a, b) =>
        a[state.filter].localeCompare(b[state.filter]),
      );
    }
  });

  return (
    <div>
      <BlogForm />
      <h3>Blogs</h3>
      <SortMenu />
      {blogs.map((blog) => (
        <SingleBlog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
