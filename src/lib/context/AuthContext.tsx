import type { Context, Dispatch, SetStateAction, FC, ReactNode } from 'react';
import { useState, createContext } from 'react';

export const AuthContext: Context<any> = createContext(false);

interface PropsAuthContextProvider {
	children: ReactNode;
	isToken: boolean;
}

export const AuthContextProvider: FC<PropsAuthContextProvider> = ({
	children,
	isToken,
}): JSX.Element => {
	const [auth, setAuth]: [boolean, Dispatch<SetStateAction<boolean>>] =
		useState<boolean>(isToken);

	return (
		<>
			<AuthContext.Provider value={{ auth, setAuth }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};
