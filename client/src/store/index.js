import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";

const reducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
