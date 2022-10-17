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
	Login: (jwt, name, image) => {},
	Logout: () => {},
	updateProfile: data => {},
});

export const AuthContextProvider: FC<PropsAuthContextProvider> = ({
	children,
	JWToken,
	image,
}): JSX.Element => {
	const { auth, Login, Logout, updateProfile } = useAuth();
	console.info('🚀 ~>  file: AuthContext.tsx ~>  line 25 ~>  auth', auth);

	useEffect((): void => {
		if (JWToken !== DEFAULT_VALUE_COOKIE_EXAMPLE) return;
		Login(JWToken, 'davidev', image);

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
