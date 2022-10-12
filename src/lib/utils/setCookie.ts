import { serialize } from 'cookie';
import type { NextApiResponse } from 'next';
import { generateExpireCookie } from './genetorExpireCookie';
// import { serialize } from 'v8';

interface ISetCookieAuth {
	res: NextApiResponse;
}

export const COOKIE_AUTH: string = 'AUTH_TOKEN';
export const DEFAULT_VALUE_COOKIE_EXAMPLE: string = 'jwt-token-example-123';

export const SET_HEADER_TYPE: {
	// [key: string]: string;
	_SET_COOKIE: string;
} = {
	_SET_COOKIE: 'Set-Cookie',
};

export function setCookie({ res }: ISetCookieAuth): void {
	res.setHeader(
		SET_HEADER_TYPE._SET_COOKIE,
		serialize(COOKIE_AUTH, DEFAULT_VALUE_COOKIE_EXAMPLE, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			expires: generateExpireCookie(),
		})
	);
}
