import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import login from "./modules/login";
import user from "./modules/profile";
import home from "./modules/home";

export const store = configureStore({
  reducer: { login, user, home },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
