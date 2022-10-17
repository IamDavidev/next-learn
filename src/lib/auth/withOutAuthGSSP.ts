import { REDIRECT_WITHOUT_AUTH } from '~constants/redirects';
import type {
	callFnProps,
	IPropsWithOutAuthHOF,
	IReturnWithOutAuth,
	returnCallFn,
} from '~interfaces/auth.types';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

const RETURN_PROPS = {
	props: {},
};

export function withOutAuthGSSP(
	callBackFn?: (props: callFnProps) => returnCallFn
): ({ req, res }: IPropsWithOutAuthHOF) => IReturnWithOutAuth {
	return ({ req, res }: IPropsWithOutAuthHOF): IReturnWithOutAuth => {
		const { cookies } = req;
		const cookieAuthToken = cookies.AUTH_TOKEN;

		if (cookieAuthToken === DEFAULT_VALUE_COOKIE_EXAMPLE)
			return REDIRECT_WITHOUT_AUTH('/');

		return callBackFn !== undefined
			? callBackFn({ req, res, cookieAuthToken })
			: RETURN_PROPS;
	};
}
