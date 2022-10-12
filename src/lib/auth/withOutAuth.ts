import type {
	callFnProps,
	IPropsWithOutAuthHOF,
	returnCallFn,
} from '~interfaces/auth.types';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export function withOutAuth(
	callBackFn: (props: callFnProps) => returnCallFn,
	path: string
): any {
	return ({ req, res }: IPropsWithOutAuthHOF): any => {
		const { cookies } = req;
		console.info(
			'🚀 ~>  file: withOutAuth.ts ~>  line 37 ~>  return ~>  req',
			req
		);
		console.info(
			'🚀 ~>  file: withOutAuth.ts ~>  line 37 ~>  return ~>  cookies',
			cookies
		);

		const cookieAuthToken = cookies.AUTH_TOKEN;

		console.info(
			'🚀 ~>  file: withOutAuth.ts ~>  line 39 ~>  return ~>  cookieAuthToken',
			cookieAuthToken
		);

		if (cookieAuthToken === DEFAULT_VALUE_COOKIE_EXAMPLE) {
			return {
				redirect: {
					destination: path,
					permanent: false,
				},
			};
		}

		return callBackFn({ req, res, cookieAuthToken });
	};
}
