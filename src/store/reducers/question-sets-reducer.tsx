import { QuestionSetState } from "@/lib/types/state";
import { QuestionsetActions } from "../actions";

const questionSetsReducer = (
  state: QuestionSetState,
  action: QuestionsetActions
): QuestionSetState => {
  switch (action.type) {
    case "question-sets/ADD_QUESTION_SET":
      return {
        ...state,
        loading: true,
      };
    case "question-sets/REMOVE_QUESTION_SET":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default questionSetsReducer;
