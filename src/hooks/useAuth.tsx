import { AppStateContext } from '@/store';
import React from 'react';

const useAuth = () => {
	const {
		dispatch,
		state: {
			persist: { auth },
		},
	} = React.useContext(AppStateContext);
	return {
		auth,
		dispatch,
	};
};

export default useAuth;