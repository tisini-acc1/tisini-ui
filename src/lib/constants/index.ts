export const APP_NAME = "tisini.co.ke-app-v1"

const prefix = APP_NAME;
type AppStates = "tisini-app-authState" | "tisini-app-quiz-playState";

export const stateKeys: Record<AppStates, string> = {
  "tisini-app-authState": `${prefix}-authState`,
  "tisini-app-quiz-playState": `${prefix}-quiz-playState`,
};
export const defaultPagination = {
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
  page: 1,
  limit: 10,
  totalDocs: 0,
  totalPages: 0,

};