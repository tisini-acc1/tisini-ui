/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ArticleInterface,
  OrganizationInterface,
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

export type ArticlesState = {
  articles: ArticleInterface[];
  loading: boolean;
  error: string;
};

export type OrganizationsState = {
  organizations: OrganizationInterface[];
  loading: boolean;
  error: string;
};

/**
 * Persistent state map
 */
export type PersistState = {
  auth: AuthState;
};
export type QuestionSetState = {
  questionsets: QuestionSetInterface[];
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
};

export type RolesPayload = {
  [key: string]: any;
  _id: string;
  name: string;
  description: string;
  default: boolean;
  createdAt: Date;
  updatedAt: Date;
  permissions: number;
  __v: 0;
};

export type KeyOfType<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

// export type Y = PickKeysType<s, keyof s>;

export type SortFunction<T> = (items: T[], field: string) => T[];
