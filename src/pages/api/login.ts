import type { NextApiRequest, NextApiResponse } from 'next';

import { serialize } from 'cookie';
import { generateExpireCookie } from '~lib/utils';

const COOKIE_AUTH = 'AUTH_TOKEN';
const DEFAULT_VALUE_COOKIE_EXAMPLE = 'true';

export default function LoginController(
	req: NextApiRequest,
	res: NextApiResponse
): void {
	const { method, body } = req;

	if (method !== 'POST')
		return res.status(405).json({
			error: 'Error: Method  no Valid',
		});

	const {
		email,
		password,
		...rest
	}: {
		email: string;
		password: string;
	} = body;

	console.log('🚀 ~ file: login.ts ~ line 22 ~ password', password);

	if (email === undefined || password === undefined)
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
			expires: generateExpireCookie(),
		})
	);

	res.status(200).json({
		email,
		password,
	});
}