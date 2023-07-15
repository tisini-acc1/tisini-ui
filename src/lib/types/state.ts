/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ArticleInterface,
  OrganizationInterface,
  PaginatedResponse,
  QuestionSetInterface,
  UserInterface,
} from ".";

/**
 * AuthState
 */
export type AuthState = {
  user: UserInterface | null;
  loading: boolean;
  error: string;
  access_token: string;
  refresh_token: string;
  isAuthenticated: boolean;
};
/**
 * ArticlesState
 */
export type ArticlesState = {
  articles: PaginatedResponse<ArticleInterface>;
  loading: boolean;
  error: string;
};
/**
 * OrganizationsState
 */
export type OrganizationsState = {
  organizations: PaginatedResponse<OrganizationInterface>;
  loading: boolean;
  error: string;
};
/**
 * Sponsored articles
 */
export type SponsoredArticlesState = {
  articles: Array<ArticleInterface>;
  loading: boolean;
  error: string;
};

/**
 * Persistent state map
 */
export type PersistState = {
  auth: AuthState;
};
/**
 * QuestionSetState
 */
export type QuestionSetState = {
  questionsets: PaginatedResponse<QuestionSetInterface>;
  loading: boolean;
  error: string;
};
/**
 * AppState
 */
export type AppState = {
  persist: PersistState;
  organizations: OrganizationsState;
  questionsets: QuestionSetState;
  articles: ArticlesState;
  sponsoredArticles: SponsoredArticlesState;
};

export type KeyOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

// export type Y = PickKeysType<s, keyof s>;

export type SortFunction<T> = (items: T[], field: string) => T[];
