import { Context, FC, useEffect, createContext } from 'react';

import {
	PropsAuthContextProvider,
	useAuthContext,
} from '~interfaces/auth.types';

import { useAuth } from '~lib/hooks';
import { EMPTY_STATE_USER } from '~lib/hooks/useAuth';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export const AuthContext: Context<useAuthContext> = createContext({
	auth: EMPTY_STATE_USER,
	Login: (jwt, name) => {},
	Logout: () => {},
	updateProfile: data => {},
});

export const AuthContextProvider: FC<PropsAuthContextProvider> = ({
	children,
	JWToken,
}): JSX.Element => {
	const { auth, Login, Logout, updateProfile } = useAuth();

	useEffect((): void => {
		if (JWToken !== DEFAULT_VALUE_COOKIE_EXAMPLE) return;
		Login(JWToken, 'davidev');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JWToken]);

	return (
		<>
			<AuthContext.Provider value={{ auth, Login, Logout, updateProfile }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};
