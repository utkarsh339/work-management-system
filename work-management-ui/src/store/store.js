import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import taskReducer from "./taskSlice";
import apiReducer, { apiSlice } from "./api/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    [apiSlice.reducerPath]: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
