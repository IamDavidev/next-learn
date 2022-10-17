import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import { AuthContextProvider } from '~lib/context';
import { theme } from '~constants/theme';

function MyApp({ Component, pageProps }: AppProps<any>): JSX.Element {
	console.info(
		'🚀 ~>  file: _app.tsx ~>  line 9 ~>  MyApp ~>  pageProps',
		pageProps
	);
	const JWToken = pageProps?.token;
	const profileImage = pageProps?.profileImage;

	return (
		<NextUIProvider theme={theme}>
			<AuthContextProvider JWToken={JWToken} image={profileImage}>
				<Component {...pageProps} />
			</AuthContextProvider>
		</NextUIProvider>
	);
}

export default MyApp;
