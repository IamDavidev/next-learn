import { IncomingMessage } from 'http';

interface callFnProps {
	req?: IncomingMessage & {
		cookies: Partial<{
			[key: string]: string;
		}>;
	};
	path: string;
}

interface returnCallFn {
	props: {
		[key: string]: any;
	};
}

export function withOutAuth(
	callBackFn: (
		props: callFnProps & {
			cookieIsAuthToken?: string;
		}
	) => returnCallFn,
	path: string
): any {
	return ({ req, ...args }: any) => {
		const { cookies } = req;

		const cookieIsAuthToken = cookies.AUTH_TOKEN;

		if (cookieIsAuthToken !== undefined) {
			return {
				redirect: {
					destination: path,
					permanent: false,
				},
			};
		}
		return callBackFn({ req, ...args, cookieIsAuthToken });
	};
}
