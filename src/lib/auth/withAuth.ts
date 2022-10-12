import {
	callFnProps,
	IPropsWithAuthHOF,
	IReturnWithAuth,
	returnCallFn,
} from '~interfaces/auth.types';
import { removeCookie } from '~lib/utils/removeCookie';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export function withAuth(
	callBackFn: (props: callFnProps) => returnCallFn,
	path: string
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
					destination: path,
					permanent: false,
				},
			};
		}
		return callBackFn({ req, res, cookieAuthToken });
	};
}
