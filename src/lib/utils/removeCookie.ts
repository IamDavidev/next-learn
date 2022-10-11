import { serialize } from 'cookie';
import type { NextApiResponse } from 'next';
import {
	COOKIE_AUTH,
	DEFAULT_VALUE_COOKIE_EXAMPLE,
	SET_HEADER_TYPE,
} from './setCookie';

interface IPropsRemoveCookie {
	res: NextApiResponse;
}

// const removeCookie = ({ res }) => {};
export function removeCookie({ res }: IPropsRemoveCookie): void {
	res.setHeader(
		SET_HEADER_TYPE._SET_COOKIE,
		serialize(COOKIE_AUTH, DEFAULT_VALUE_COOKIE_EXAMPLE, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			expires: new Date(0),
			maxAge: -1,
		})
	);
}
