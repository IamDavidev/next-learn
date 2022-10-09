import type { IncomingMessage } from 'http';

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

type reutrnWithOutAuth =
	| returnCallFn
	| {
			redirect: {
				destination: string;
				permanent: boolean;
			};
	  };

export function withOutAuth(
	callBackFn: (
		props: callFnProps & {
			cookieIsAuthToken?: string;
		}
	) => returnCallFn,
	path: string
): any {
	return ({ req, ...args }: any): reutrnWithOutAuth => {
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
