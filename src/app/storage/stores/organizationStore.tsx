"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import organizationSlice from "../slices/organization.slice";
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
const organizationStore = configureStore({
  reducer: {
    organizations: organizationSlice,
  },
});

export type OrganizationRootState = ReturnType<typeof organizationStore.getState>;
export type OrganizationDispatch = typeof organizationStore.dispatch;

export const useOrganizationDispatch = () => useDispatch<OrganizationDispatch>();
export const useOrganizationSelector: TypedUseSelectorHook<OrganizationRootState> = useSelector;

export default organizationStore;
