/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AppState } from "@/lib/types/state";
import { stateKeys } from "@/lib/constants";

const initialState: AppState = {
	persist: JSON.parse(localStorage.getItem(stateKeys["tisini-app-authState"])!)
		? JSON.parse(localStorage.getItem(stateKeys["tisini-app-authState"])!)
		: {
			auth: {
				user: null,
				loading: false,
				error: '',
				access_token: '',
				isAuthenticated: false,
			},
		},
	organizations:{
        organizations: [],
        loading: false,
        error: '',
    },
    questionsets:{
        questionsets: [],
        loading: false,
        error: '',
    },
    articles:{
        articles: [],
        loading: false,
        error: '',
    },

};

export default initialState;