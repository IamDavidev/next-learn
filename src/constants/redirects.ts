import { returnRedirect } from '~interfaces/auth.types';

export function REDIRECT_WITH_AUTH(
	destination: string,
	permanent: boolean = false
): returnRedirect {
	return {
		redirect: {
			destination,
			permanent,
		},
	};
}

export function REDIRECT_WITHOUT_AUTH(
	destination: string,
	permanent: boolean = false
): returnRedirect {
	return {
		redirect: {
			destination,
			permanent,
		},
	};
}
