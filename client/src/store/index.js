import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/userSlice";
import transactionSlice from "../features/transactions/transactionSlice";

const reducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  transaction: transactionSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
