import {
  ActionMapper,
  PaginatedResponse,
  QuestionSetInterface,
} from "@/lib/types";

// Questionsets
export type QuestionsetActionTypes = {
  ["question-sets/LOAD_START"]: {
    type: "question-sets/LOAD_START";
  };
  ["question-sets/LOAD_SUCCESS"]: {
    type: "question-sets/LOAD_SUCCESS";
    payload: PaginatedResponse<QuestionSetInterface>;
  };
  ["question-sets/LOAD_FAILURE"]: {
    type: "question-sets/LOAD_FAILURE";
    payload: string;
  };

  ["question-sets/SETTLE"]: {
    type: "question-sets/SETTLE";
  };
};
// Actions
export type QuestionsetActions =
  ActionMapper<QuestionsetActionTypes>[keyof ActionMapper<QuestionsetActionTypes>];
