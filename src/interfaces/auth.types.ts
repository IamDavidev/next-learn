import type { IncomingMessage } from 'http';
import type { NextApiResponse } from 'next';
import type { ReactNode } from 'react';
import type { emptyStateUser } from './user.types';

export interface callFnProps {
	req?: IncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	};
	res: NextApiResponse;
	cookieAuthToken: string | undefined;
}

export interface returnCallFn {
	props: {
		[key: string]: any;
		token?: string;
	};
}
export interface IPropsAuthHOF {
	req: IncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	};
	res: NextApiResponse;
	resolvedUrl?: string;
}

export interface returnRedirect {
	redirect: {
		destination: string;
		permanent: boolean;
	};
}

type reutrnAuthHOF = returnCallFn | returnRedirect;

export type IReturnWithAuth = Promise<reutrnAuthHOF>;
export type IReturnWithOutAuth = reutrnAuthHOF;
export type IReturnWithStandard = reutrnAuthHOF;

export type IPropsWithAuthHOF = IPropsAuthHOF;
export type IPropsWithOutAuthHOF = IPropsAuthHOF;
export type IPropsWithStandardHOF = IPropsAuthHOF;

export interface PropsAuthContextProvider {
	children: ReactNode;
	JWToken?: string;
	image?: string;
}

export interface useAuthContext {
	auth: emptyStateUser;
	Login: (Jwt: string, name: string, image: string | undefined) => void;
	Logout: () => void;
	updateProfile: (data: any) => void;
}
