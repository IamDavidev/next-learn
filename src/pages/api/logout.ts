import type { NextApiRequest, NextApiResponse } from 'next';
import { removeCookie } from '~lib/utils/removeCookie';
import { METHODS_TYPE } from './login';

export default function LogoutController(
	req: NextApiRequest,
	res: NextApiResponse
): void {
	const { method } = req;

	if (method !== METHODS_TYPE._POST)
		return res.status(405).json({
			error: 'Error: Method  no Valid',
		});

	removeCookie({
		res,
	});

	res.status(200).json({
		message: 'Logout',
	});
}
