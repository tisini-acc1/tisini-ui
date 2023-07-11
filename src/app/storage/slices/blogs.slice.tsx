import { createSlice } from "@reduxjs/toolkit";
import { BlogsSliceStateType } from "../types";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
} as BlogsSliceStateType;

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs: (state) => {
      state.loading = true;
    },
  },
});

export const { getBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
