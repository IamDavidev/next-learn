import {
	callFnProps,
	IPropsWithStandardHOF,
	IReturnWithStandard,
	returnCallFn,
} from '~interfaces/auth.types';
import { removeCookie } from '~lib/utils/removeCookie';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export function withStandard(
	callbackFN: (props: callFnProps) => returnCallFn
): ({ req, res }: IPropsWithStandardHOF) => IReturnWithStandard {
	return ({ req, res }: IPropsWithStandardHOF): IReturnWithStandard => {
		const { cookies } = req;

		const cookieAuthToken = cookies.AUTH_TOKEN;
		console.info(
			'🚀 ~>  file: withStandard.ts ~>  line 17 ~>  return ~>  cookieAuthToken',
			cookieAuthToken
		);

		if (cookieAuthToken !== DEFAULT_VALUE_COOKIE_EXAMPLE) {
			removeCookie({
				res,
			});

			return {
				props: {
					isAuth: false,
				},
			};
		}
		return callbackFN({ req, res, cookieAuthToken });
	};
}
