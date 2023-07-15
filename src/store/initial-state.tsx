/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { defaultPagination, stateKeys } from "@/lib/constants";

import { AppState } from "@/lib/types/state";

const initialState: AppState = {
  persist: JSON.parse(localStorage.getItem(stateKeys["tisini-app-authState"])!)
    ? JSON.parse(localStorage.getItem(stateKeys["tisini-app-authState"])!)
    : {
        auth: {
          user: null,
          loading: false,
          error: "",
          access_token: "",
          isAuthenticated: false,
        },
      },
  organizations: {
    organizations: {
      results: [],
      pagination: { ...defaultPagination },
    },
    loading: false,
    error: "",
  },
  questionsets: {
    loading: false,
    error: "",
    questionsets: {
      results: [],
      pagination: { ...defaultPagination },
    },
  },
  articles: {
    loading: false,
    error: "",
    articles: {
      results: [],
      pagination: { ...defaultPagination },
    },
  },
  sponsoredArticles: {
    loading: false,
    error: "",
    articles:[]
  },
};

export default initialState;
