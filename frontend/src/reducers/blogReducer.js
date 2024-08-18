import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notifReducer";
import { clearUser } from "./userReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const response = await blogService.update(changedBlog);
      dispatch(updateBlog(response));
    } catch (exception) {
      dispatch(
        notify(
          {
            message: "This blog has already been deleted from server",
            color: "red",
          },
          2,
        ),
      );
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id);
      dispatch(deleteBlog(blog));

      dispatch(
        notify(
          {
            message: `Deleted "${blog.title}" by ${blog.author}`,
            color: "green",
          },
          2,
        ),
      );
    } catch (exception) {
      if (exception.response.status === 401) {
        window.localStorage.removeItem("loggedBlogAppUser");
        dispatch(clearUser());
      }
      dispatch(
        notify(
          {
            message: "Failed to delete blog",
            color: "red",
          },
          2,
        ),
      );
    }
  };
};

export default blogSlice.reducer;
