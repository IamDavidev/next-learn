import type { Context, Dispatch, SetStateAction, FC, ReactNode } from 'react';
import { useState, createContext } from 'react';

export const AuthContext: Context<any> = createContext(false);

interface PropsAuthContextProvider {
	children: ReactNode;
}

export const AuthContextProvider: FC<PropsAuthContextProvider> = ({
	children,
}): JSX.Element => {
	const [auth, setAuth]: [boolean, Dispatch<SetStateAction<boolean>>] =
		useState(false);
	console.log('🚀 ~ file: AuthContext.tsx ~ line 14 ~ auth', auth);

	return (
		<>
			<AuthContext.Provider value={{ auth, setAuth }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};
