import type { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';
import { generateExpireCookie } from '~lib/utils';

export const COOKIE_AUTH: string = 'AUTH_TOKEN';
export const DEFAULT_VALUE_COOKIE_EXAMPLE: string = 'jwt-token-example-123';

export const METHODS_TYPE = {
	_GET: 'GET',
	_POST: 'POST',
	_PUT: 'PUT',
	_DELETE: 'DELETE',
};

export default function LoginController(
	req: NextApiRequest,
	res: NextApiResponse
): void {
	const { method, body } = req;
	if (method !== METHODS_TYPE._POST)
		return res.status(405).json({
			error: 'Error: Method  no Valid',
		});

	const {
		username,
		password,
		...rest
	}: {
		username: string;
		password: string;
	} = JSON.parse(body);

	if (username === undefined || password === undefined)
		return res.status(400).send({
			error: 'missing Fields requireds',
		});

	if (Object.keys(rest).length !== 0)
		return res.status(400).send({ errro: 'Exist more fields ' });

	res.setHeader(
		'Set-Cookie',
		serialize(COOKIE_AUTH, DEFAULT_VALUE_COOKIE_EXAMPLE, {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			expires: generateExpireCookie(),
		})
	);

	res.status(200).json({
		username,
		jwt: DEFAULT_VALUE_COOKIE_EXAMPLE,
	});
}
