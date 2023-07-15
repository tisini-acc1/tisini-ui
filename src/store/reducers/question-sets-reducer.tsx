import { QuestionSetState } from "@/lib/types/state";
import { QuestionsetActions } from "../actions";

const questionSetsReducer = (
  state: QuestionSetState,
  action: QuestionsetActions
): QuestionSetState => {
  switch (action.type) {
    case "question-sets/LOAD_START":
      return {
        ...state,
        loading: true,
      };
    case "question-sets/LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        questionsets: action.payload,
      };
    case "question-sets/LOAD_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "question-sets/SETTLE":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default questionSetsReducer;
