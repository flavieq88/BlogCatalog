import { useSelector, useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const handleLike = (blog) => {
    dispatch(likeBlog({ ...blog, user: blog.user.id }));
  };

  const handleDelete = (blog) => {
    dispatch(removeBlog(blog));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog)}
          user={"flavieq88"}
        />
      ))}
    </div>
  );
};

export default BlogList;
