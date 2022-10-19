import { dehydrate, QueryClient } from 'react-query';

import { REDIRECT_WITH_AUTH } from '~constants/redirects';
import {
	callFnProps,
	IPropsWithAuthHOF,
	IReturnWithAuth,
	returnCallFn,
} from '~interfaces/auth.types';
import { removeCookie } from '~lib/utils';

import { DEFAULT_VALUE_COOKIE_EXAMPLE } from '~lib/utils/setCookie';

interface getAvatarProfileReturn {
	image: string;
	role: string;
}

export async function getAvatarProfile(): Promise<getAvatarProfileReturn> {
	const responseImage = await fetch('https://api.github.com/users/rxyhn')
		.then(async res => await res.json())
		.then(data => {
			console.log(data);
			return {
				image: data.avatar_url,
				role: data.type,
			};
		});

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

			await queryClient.fetchQuery(
				['avatar', 'data'],
				async (): Promise<getAvatarProfileReturn> => await getAvatarProfile()
			);

			return callBackFn !== undefined
				? callBackFn({
						res,
						req,
						cookieAuthToken,
				  })
				: {
						props: {
							token: cookieAuthToken,
							dehydratedState: dehydrate(queryClient),
						},
				  };
		} catch (err) {
			removeCookie({
				res,
			});

			return {
				props: {},
			};
		}
	};
}
