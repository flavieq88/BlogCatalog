import { useSelector } from "react-redux";

import Blog from "./Blog";

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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
