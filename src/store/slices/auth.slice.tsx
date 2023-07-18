import { removeToken } from "@/lib/services/cookie-service";
import { AuthState } from "@/lib/types/state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: "",
  access_token: "",
  isAuthenticated: false,
  refresh_token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.isAuthenticated = true;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
    ,
    logoutUser: (state) => {
      removeToken('tisini-tokens-369340a21d88d03d9509');
      state.loading = false;
      state.user = null;
      state.access_token = "";
      state.refresh_token = "";
      state.isAuthenticated = false;
    },

  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
