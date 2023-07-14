import { AuthActions } from "../actions/state-actions";
import { AuthState } from "@/lib/types/state";
import { removeToken } from "@/lib/services/cookie-service";

const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case "auth/LOGIN-START":
      return {
        ...state,
        loading: true,
      };
    case "auth/LOGIN-FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "auth/LOGIN-SUCCESS":
      return {
        ...state,
        ...action.payload,
        error: "",
        isAuthenticated: true,
        loading: false,
      };
    case "auth/LOGOUT":
      {
        removeToken('ts-user-c1d2625da1e943284683');
        return {
        ...state,
        access_token: "",
        error: "",
        isAuthenticated: false,
        loading: false,
        user: null,
      };}
    default:
      return state;
  }
};

export default authReducer;
