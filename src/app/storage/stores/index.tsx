"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import blogsSlice from "../slices/blogs.slice";
// import {
// 	persistStore,
// 	persistReducer,
// 	FLUSH,
// 	REHYDRATE,
// 	PAUSE,
// 	PERSIST,
// 	PURGE,
// 	REGISTER,
// } from 'redux-persist';
// import { combineReducers } from 'redux';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
// 	key: 'o-web-connect-state-2',
// 	version: 1,
// 	storage,
// };

// const rootReducer = persistReducer(
// 	persistConfig,
// 	combineReducers({ auth: authReducer, user: userReducer }),
// );
const baseStore = configureStore({
  reducer: {
    blogs: blogsSlice,
  },
});

export type RootState = ReturnType<typeof baseStore.getState>;
export type AppDispatch = typeof baseStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default baseStore;
