import { OrganizationsActions } from "../actions/state-actions";
import { OrganizationsState } from "@/lib/types/state";

const organizationsReducer = (
  state: OrganizationsState,
  action: OrganizationsActions
): OrganizationsState => {
  switch (action.type) {
    case "organizations/LOAD_START":
      return {
        ...state,
        loading: true,
      };
    case "organizations/LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        organizations: action.payload,
      };
    case "organizations/LOAD_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default organizationsReducer;
