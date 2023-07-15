import { ArticlesActions } from "./articles-actions";
import { AuthActions } from "./auth-actions";
import { OrganizationsActions } from "./organizations-actions";
import { QuestionsetActions } from "./question-sets-actions";
import { SponsoredArticlesActions } from "./sponsored-articles-actions";

export type { ArticlesActionTypes, ArticlesActions } from "./articles-actions";
export type { AuthActionsType, AuthActions } from "./auth-actions";
export type {
  OrganizationsActionTypes,
  OrganizationsActions,
} from "./organizations-actions";
export type {
  QuestionsetActionTypes,
  QuestionsetActions,
} from "./question-sets-actions";
export type {
  SponsoredArticlesActionTypes,
  SponsoredArticlesActions,
} from "./sponsored-articles-actions";


export type  StateActions =
  | ArticlesActions
  | AuthActions
  | OrganizationsActions
  | QuestionsetActions
  | SponsoredArticlesActions;


