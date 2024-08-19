import { configureStore } from "@reduxjs/toolkit";

import notifReducer from "./reducers/notifReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    notification: notifReducer,
    blogs: blogReducer,
    user: userReducer,
    filter: filterReducer,
  },
});

export default store;
