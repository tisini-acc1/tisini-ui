import {
  ArticlesActions,
  AuthActions,
  OrganizationsActions,
  QuestionsetActions,
  SponsoredArticlesActions,
  StateActions,
} from "./actions";
import { createContext, useEffect, useMemo, useReducer } from "react";

import { AppState } from "@/lib/types/state";
import articlesReducer from "./reducers/articles-reducers";
import authReducer from "./reducers/auth-reducer";
import initialState from "./initial-state";
import organizationsReducer from "./reducers/organizations-reducer";
import questionSetsReducer from "./reducers/question-sets-reducer";
import sponsoredArticlesReducer from "./reducers/sponsored-articles-reducer";
import { stateKeys } from "@/lib/constants";

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<StateActions>;
}>(
  {} as {
    state: AppState;
    dispatch: () => null;
  }
);

const combinedReducer = (state: AppState, action: StateActions): AppState => ({
  persist: {
    auth: authReducer(state.persist.auth, action as AuthActions),
  },
  questionsets: questionSetsReducer(
    state.questionsets,
    action as QuestionsetActions
  ),
  organizations: organizationsReducer(
    state.organizations,
    action as OrganizationsActions
  ),
  articles: articlesReducer(state.articles, action as ArticlesActions),
  sponsoredArticles: sponsoredArticlesReducer(
    state.sponsoredArticles,
    action as SponsoredArticlesActions
  ),
});
function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(combinedReducer, initialState);

  const appState = useMemo<{
    state: AppState;
    dispatch: React.Dispatch<StateActions>;
  }>(() => ({ state, dispatch }), [state]);
  useEffect(() => {
    localStorage.setItem(
      stateKeys["tisini-app-authState"],
      JSON.stringify(state.persist)
    );
  }, [state.persist]);

  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
}

export { AppStateContext, AppStateProvider };
