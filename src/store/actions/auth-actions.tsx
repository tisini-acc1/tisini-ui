import { ActionMapper } from "@/lib/types";
import { AuthState } from "@/lib/types/state";

// Auth
export type AuthActionsType = {
  ["auth/LOGIN-START"]: {
    type: "auth/LOGIN-START";
  };
  ["auth/LOGIN-SUCCESS"]: {
    type: "auth/LOGIN-SUCCESS";
    payload: AuthState;
  };
  ["auth/LOGIN-FAILURE"]: {
    type: "auth/LOGIN-FAILURE";
    payload: string;
  };

  ["auth/LOGOUT"]: {
    type: "auth/LOGOUT";
  };
};
// Actions
export type AuthActions =
  ActionMapper<AuthActionsType>[keyof ActionMapper<AuthActionsType>];
