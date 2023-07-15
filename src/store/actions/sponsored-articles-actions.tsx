import { ActionMapper, ArticleInterface } from "@/lib/types";

// Sponsored articles Actions
export type SponsoredArticlesActionTypes = {
  ["sponsored-articles/LOAD_START"]: {
    type: "sponsored-articles/LOAD_START";
  };
  ["sponsored-articles/LOAD_SUCCESS"]: {
    type: "sponsored-articles/LOAD_SUCCESS";
    payload: Array<ArticleInterface>;
  };
  ["sponsored-articles/LOAD_FAILURE"]: {
    payload: string;
    type: "sponsored-articles/LOAD_FAILURE";
  };
  ["sponsored-articles/SETTLE"]: {
    type: "sponsored-articles/SETTLE";
  };
};

// Actions Sponsored articles
export type SponsoredArticlesActions =
  ActionMapper<SponsoredArticlesActionTypes>[keyof ActionMapper<SponsoredArticlesActionTypes>];
