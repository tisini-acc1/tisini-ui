import { SponsoredArticlesState } from "@/lib/types/state";

import { SponsoredArticlesActions } from "../actions";

const sponsoredArticlesReducer = (
  state: SponsoredArticlesState,
  action: SponsoredArticlesActions
): SponsoredArticlesState => {
  switch (action.type) {
    case "sponsored-articles/LOAD_START":
      return {
        ...state,
        loading: true,
      };
    case "sponsored-articles/LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        articles: action.payload,
      };
    case "sponsored-articles/LOAD_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "sponsored-articles/SETTLE":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default sponsoredArticlesReducer;
