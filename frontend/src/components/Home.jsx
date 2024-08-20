import BlogForm from "./BlogForm";

const Home = () => {
  return (
    <div>
      <h1>Welcome to BlogCatalog!</h1>
      <h2>Post and share a blog:</h2>
      <BlogForm />
      <h2>Search for a blog:</h2>
      <form>
        <input placeholder="Search by title or author" />
      </form>
    </div>
  );
};

export default Home;
