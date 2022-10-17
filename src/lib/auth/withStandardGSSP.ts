import {
	callFnProps,
	IPropsWithStandardHOF,
	IReturnWithStandard,
	returnCallFn,
} from '~interfaces/auth.types';
import { removeCookie } from '~lib/utils/removeCookie';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export function withStandardGSSP(
	callbackFN?: (props: callFnProps) => returnCallFn
): ({ req, res }: IPropsWithStandardHOF) => Promise<IReturnWithStandard> {
	return async ({
		req,
		res,
	}: IPropsWithStandardHOF): Promise<IReturnWithStandard> => {
		const { cookies } = req;

		const cookieAuthToken = cookies.AUTH_TOKEN;

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
		const profileImage = await fetch('https://randomuser.me/api/')
			.then(async res => await res.json())
			.then(data => {
				const image = data.results[0].picture.medium;
				return image;
			});

		return callbackFN !== undefined
			? callbackFN({ req, res, cookieAuthToken })
			: {
					props: {
						token: cookieAuthToken,
						isAuth: true,
						profileImage,
					},
			  };
	};
}
