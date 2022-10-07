// IncomingMessage & {
//     cookies: Partial<{
//         [key: string]: string;
//     }>;
// }

import type { IncomingMessage } from 'http';

interface PropsCheckAuth {
	req: IncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	};
	path: string;
}

export function chekAuthPublic({ req, path }: PropsCheckAuth): any {
	const { cookies } = req;

	const tokenCookies = cookies.AUTH_TOKEN;

	if (tokenCookies !== undefined) {
		return {
			redirect: {
				destination: path,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export function chekAuthLogged({ req, path }: PropsCheckAuth): any {
	const { cookies } = req;

	const tokenCookies = cookies.AUTH_TOKEN;

	if (tokenCookies === undefined) {
		return {
			redirect: {
				destination: path,
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
