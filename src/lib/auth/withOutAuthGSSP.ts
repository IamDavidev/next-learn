import type {
	callFnProps,
	IPropsWithOutAuthHOF,
	IReturnWithOutAuth,
	returnCallFn,
} from '~interfaces/auth.types';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export function withOutAuthGSSP(
	callBackFn?: (props: callFnProps) => returnCallFn
): ({ req, res }: IPropsWithOutAuthHOF) => IReturnWithOutAuth {
	return ({ req, res }: IPropsWithOutAuthHOF): IReturnWithOutAuth => {
		const { cookies } = req;

		const cookieAuthToken = cookies.AUTH_TOKEN;

		if (cookieAuthToken === DEFAULT_VALUE_COOKIE_EXAMPLE) {
			return {
				redirect: {
					destination: '/profile',
					permanent: false,
				},
			};
		}

		return callBackFn !== undefined
			? callBackFn({ req, res, cookieAuthToken })
			: {
					props: {},
			  };
	};
}
