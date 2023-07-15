import { ActionMapper, QuestionSetInterface } from "@/lib/types";

// Questionsets
export type QuestionsetActionTypes = {
  ["question-sets/ADD_QUESTION_SET"]: {
    type: "question-sets/ADD_QUESTION_SET";
    payload: QuestionSetInterface;
  };
  ["question-sets/REMOVE_QUESTION_SET"]: {
    type: "question-sets/REMOVE_QUESTION_SET";
    payload: QuestionSetInterface;
  };
};
// Actions
export type QuestionsetActions =
  ActionMapper<QuestionsetActionTypes>[keyof ActionMapper<QuestionsetActionTypes>];
