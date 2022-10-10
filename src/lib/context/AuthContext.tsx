import {
	Context,
	Dispatch,
	SetStateAction,
	FC,
	ReactNode,
	useEffect,
	useState,
	createContext,
} from 'react';

interface PropsAuthContextProvider {
	children: ReactNode;
	isToken: boolean;
}

type userRole = 'admin' | 'user Premium' | 'user Free' | 'no role';
interface emptyStateUser {
	_id: string;
	jwt: string;
	isToken: boolean;
	user: {
		name: string;
		email: string;
		role: userRole;
		avatar: string;
	};
}
interface useAuthContext {
	auth: emptyStateUser;
	Login: (isJwt: boolean) => void;
	Logout: () => void;
	updateProfile: (data: any) => void;
}

const EMPTY_STATE_USER: emptyStateUser = {
	_id: '',
	jwt: '',
	isToken: false,
	user: {
		name: '',
		email: '',
		avatar: '',
		role: 'no role',
	},
};

export const AuthContext: Context<useAuthContext> = createContext({
	auth: EMPTY_STATE_USER,
	Login: (is: boolean) => {},
	Logout: () => {},
	updateProfile: data => {},
});

export function useAuth(): useAuthContext {
	const [auth, setAuth]: [
		emptyStateUser,
		Dispatch<SetStateAction<emptyStateUser>>
	] = useState<emptyStateUser>(EMPTY_STATE_USER);

	const Login = (isJwt: boolean): void =>
		setAuth(prevAuth => ({
			...prevAuth,
			isToken: isJwt,
		}));

	const Logout = (): void => setAuth(EMPTY_STATE_USER);

	const updateProfile = (): void => {};

	return {
		auth,
		Login,
		Logout,
		updateProfile,
	};
}

export const AuthContextProvider: FC<PropsAuthContextProvider> = ({
	children,
	isToken,
}): JSX.Element => {
	const { auth, Login, Logout, updateProfile } = useAuth();
	console.info('🚀 ~>  file: AuthContext.tsx ~>  line 82 ~>  isToken', isToken);

	useEffect((): void => {
		if (!isToken) return;
		console.log('isToken', isToken);
		Login(isToken);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isToken]);

	return (
		<>
			<AuthContext.Provider value={{ auth, Login, Logout, updateProfile }}>
				{children}
			</AuthContext.Provider>
		</>
	);
};
