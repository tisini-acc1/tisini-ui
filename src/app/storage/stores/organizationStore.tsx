"use client";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import organizationSlice from "../slices/organization.slice";
import questionStoreSlice from "../slices/questionStore.slice";

const organizationStore = configureStore({
  reducer: {
    organizations: organizationSlice,
    questionstore: questionStoreSlice,
  },
});

export type OrganizationRootState = ReturnType<typeof organizationStore.getState>;
export type OrganizationDispatch = typeof organizationStore.dispatch;

export const useOrganizationDispatch = () => useDispatch<OrganizationDispatch>();
export const useOrganizationSelector: TypedUseSelectorHook<OrganizationRootState> = useSelector;

export default organizationStore;
