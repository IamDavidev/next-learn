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
		console.info(
			'🚀 ~>  file: withOutAuth.ts ~>  line 37 ~>  return ~>  req',
			req
		);
		console.info(
			'🚀 ~>  file: withOutAuth.ts ~>  line 37 ~>  return ~>  cookies',
			cookies
		);

		const cookieIsAuthToken = cookies.AUTH_TOKEN;

		console.info(
			'🚀 ~>  file: withOutAuth.ts ~>  line 39 ~>  return ~>  cookieIsAuthToken',
			cookieIsAuthToken
		);

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
