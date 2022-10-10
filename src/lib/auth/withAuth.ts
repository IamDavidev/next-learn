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

export function withAuth(
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
		console.info(
			'🚀 ~>  file: withAuth.ts ~>  line 30 ~>  return ~>  cookieIsAuthToken',
			cookieIsAuthToken
		);

		if (cookieIsAuthToken === undefined) {
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
