import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import { useDispatch } from "react-redux";

import login from "./modules/login";

export const store = configureStore({
  reducer: { login },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
