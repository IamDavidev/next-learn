import type { Dispatch, SetStateAction } from 'react';
import type { useAuthContext } from '~interfaces/auth.types';
import type { emptyStateUser } from '~interfaces/user.types';
import { useState } from 'react';

export const EMPTY_STATE_USER: emptyStateUser = {
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

export default function useAuth(): useAuthContext {
	const [auth, setAuth]: [
		emptyStateUser,
		Dispatch<SetStateAction<emptyStateUser>>
	] = useState<emptyStateUser>(EMPTY_STATE_USER);

	const Login = (Jwt: string, name: string): void =>
		setAuth(prevAuth => ({
			...prevAuth,
			isToken: true,
			jwt: Jwt,
			user: {
				...prevAuth.user,
				name,
			},
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
