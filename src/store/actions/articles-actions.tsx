import { ActionMapper, ArticleInterface, PaginatedResponse } from "@/lib/types";

// Articles Actions
export type ArticlesActionTypes = {
  ["articles/LOAD_START"]: {
    type: "articles/LOAD_START";
  };
  ["articles/LOAD_SUCCESS"]: {
    type: "articles/LOAD_SUCCESS";
    payload: PaginatedResponse<ArticleInterface>;
  };
  ["articles/LOAD_FAILURE"]: {
    payload: string;
    type: "articles/LOAD_FAILURE";
  };
  ["articles/SETTLE"]: {
    type: "articles/SETTLE";
  };
};

// Actions
export type ArticlesActions =
  ActionMapper<ArticlesActionTypes>[keyof ActionMapper<ArticlesActionTypes>];
