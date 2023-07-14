import {
  ActionMapper,
  ArticleInterface,
  OrganizationInterface,
  QuestionSetInterface,
} from "@/lib/types";

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

// Organizations
export type OrganizationsActionTypes = {
  ["organizations/LOAD_START"]: {
    type: "organizations/LOAD_START";
  };
  ["organizations/LOAD_SUCCESS"]: {
    type: "organizations/LOAD_SUCCESS";
    payload: Array<OrganizationInterface>;
  };
  ["organizations/LOAD_FAILURE"]: {
    type: "organizations/LOAD_FAILURE";
    payload: string;
  };
};
// Actions
export type OrganizationsActions =
  ActionMapper<OrganizationsActionTypes>[keyof ActionMapper<OrganizationsActionTypes>];

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

// Articles Actions
export type ArticlesActionTypes = {
  ["articles/LOAD_START"]: {
    type: "articles/LOAD_START";
  };
  ["articles/LOAD_SUCCESS"]: {
    type: "articles/LOAD_SUCCESS";
    payload: Array<ArticleInterface>;
  };
  ["articles/LOAD_FAILURE"]: {
    payload: string;
    type: "articles/LOAD_FAILURE";
  };
};

// Actions
export type ArticlesActions =
  ActionMapper<ArticlesActionTypes>[keyof ActionMapper<ArticlesActionTypes>];

export type StateActions =
  | AuthActions
  | OrganizationsActions
  | QuestionsetActions
  | ArticlesActions;
