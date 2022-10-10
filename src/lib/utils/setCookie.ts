import { serialize } from 'cookie';
import type { NextApiResponse } from 'next';
import { generateExpireCookie } from './genetorExpireCookie';
// import { serialize } from 'v8';

interface ISetCookieAuth {
	res: NextApiResponse;
}

const COOKIE_AUTH: string = 'AUTH_TOKEN';
const DEFAULT_VALUE_COOKIE_EXAMPLE: string = 'true';

const SET_HEADER_TYPE: {
	[key: string]: string;
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
