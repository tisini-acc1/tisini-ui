import { ArticlesActions } from "../actions";
import { ArticlesState } from "@/lib/types/state";

const articlesReducer = (
  state: ArticlesState,
  action: ArticlesActions
): ArticlesState => {
  switch (action.type) {
    case "articles/LOAD_START":
      return {
        ...state,
        loading: true,
      };
    case "articles/LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        articles: action.payload,
      };
    case "articles/LOAD_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "articles/SETTLE":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default articlesReducer;
