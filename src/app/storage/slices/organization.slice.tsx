import { createSlice } from "@reduxjs/toolkit";
import { OrganizationalSliceStateType } from "../types";

const initialState = {
  organizations: [],
  loading: false,
  error: null,
} as OrganizationalSliceStateType;

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    getOrganizations: (state) => {
      state.loading = true;
    },
  },
});

export const { getOrganizations } = organizationSlice.actions;
export default organizationSlice.reducer;
