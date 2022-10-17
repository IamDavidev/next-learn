import { QueryClient } from 'react-query';

import { REDIRECT_WITH_AUTH } from '~constants/redirects';
import {
	callFnProps,
	IPropsWithAuthHOF,
	IReturnWithAuth,
	returnCallFn,
} from '~interfaces/auth.types';

import { removeCookie } from '~lib/utils/removeCookie';
import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

export async function getAvatarProfile(): Promise<string> {
	const responseImage: string = await fetch(
		'https://api.github.com/users/rafaelcassau'
	)
		.then(res => res.json())
		.then(data => data.results[0].picture.medium);

	return responseImage;
}

export function withAuthGSSP(
	callBackFn?: (props: callFnProps) => returnCallFn
): (context: IPropsWithAuthHOF) => Promise<IReturnWithAuth> {
	return async ({
		req,
		res,
		resolvedUrl,
	}: IPropsWithAuthHOF): Promise<IReturnWithAuth> => {
		const { cookies } = req;

		const cookieAuthToken = cookies.AUTH_TOKEN;

		// find and check if the cookie exist in the backend and if it is valid
		// demo: NOT IMPLEMENTED

		if (cookieAuthToken !== DEFAULT_VALUE_COOKIE_EXAMPLE)
			return REDIRECT_WITH_AUTH('/login');

		const isSSR = req.url === resolvedUrl;

		if (!isSSR)
			return {
				props: {
					token: cookieAuthToken,
				},
			};

		try {
			const queryClient = new QueryClient();

			const data = await queryClient.fetchQuery(['avatar', 'data'], () =>
				getAvatarProfile()
			);
			console.info('🚀 ~>  file: withAuthGSSP.ts ~>  line 57 ~>  data', data);

			return callBackFn !== undefined
				? callBackFn({
						res,
						req,
						cookieAuthToken,
				  })
				: {
						props: {
							token: cookieAuthToken,
							profileImage: 'not image',
						},
				  };
		} catch (err) {
			console.log('error', err);
			return {
				props: {},
			};
		}
	};
}
