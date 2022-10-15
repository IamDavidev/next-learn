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

type reutrnAuthHOF =
	| returnCallFn
	| {
			redirect: {
				destination: string;
				permanent: boolean;
			};
	  };

export type IReturnWithAuth = reutrnAuthHOF;
export type IReturnWithOutAuth = reutrnAuthHOF;
export type IReturnWithStandard = reutrnAuthHOF;

export type IPropsWithAuthHOF = IPropsAuthHOF;
export type IPropsWithOutAuthHOF = IPropsAuthHOF;
export type IPropsWithStandardHOF = IPropsAuthHOF;

export interface PropsAuthContextProvider {
	children: ReactNode;
	JWToken?: string;
}

export interface useAuthContext {
	auth: emptyStateUser;
	Login: (Jwt: string, name: string) => void;
	Logout: () => void;
	updateProfile: (data: any) => void;
}
