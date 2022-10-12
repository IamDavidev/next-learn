export type userRole = 'admin' | 'user Premium' | 'user Free' | 'no role';
export interface emptyStateUser {
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
