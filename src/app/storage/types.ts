import { ArticleInterface, OrganizationInterface } from "@/types";

export type BlogsSliceStateType = {
  blogs: ArticleInterface[];
  loading: boolean;
  error: string | null;
};

export type BlogsSliceAction = {
  type: string;
  payload: ArticleInterface[];
};

export type OrganizationalSliceStateType = {
  organizations: OrganizationInterface[];
  loading: boolean;
  error: string | null;
};
