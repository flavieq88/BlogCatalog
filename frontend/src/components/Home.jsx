import { useNavigate } from "react-router-dom";
import BlogForm from "./BlogForm";
import SearchBlog from "./SearchBlogs";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to BlogCatalog!</h1>
      BlogCatalog is a platform to share, find and discuss new blogs with other
      blog enthusiasts!
      <button onClick={() => navigate("/blogs")} className="submitButton">
        Browse all blogs
      </button>
      <br />
      <SearchBlog /> <br />
      <h2>Post a new blog:</h2>
      <BlogForm />
    </div>
  );
};

export default Home;
