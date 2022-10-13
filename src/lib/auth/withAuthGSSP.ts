import {
	callFnProps,
	IPropsWithAuthHOF,
	IReturnWithAuth,
	returnCallFn,
} from '~interfaces/auth.types';
import { removeCookie } from '~lib/utils/removeCookie';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export function withAuthGSSP(
	callBackFn?: (props: callFnProps) => returnCallFn
): ({ req, res }: IPropsWithAuthHOF) => IReturnWithAuth {
	return ({ req, res }: IPropsWithAuthHOF): IReturnWithAuth => {
		const { cookies } = req;

		const cookieAuthToken = cookies.AUTH_TOKEN;

		// find and check if the cookie exist in the backend and if it is valid
		// demo: NOT IMPLEMENTED
		if (cookieAuthToken !== DEFAULT_VALUE_COOKIE_EXAMPLE) {
			removeCookie({
				res,
			});
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			};
		}

		return callBackFn !== undefined
			? callBackFn({
					res,
					req,
					cookieAuthToken,
			  })
			: {
					props: {
						token: cookieAuthToken,
					},
			  };
	};
}