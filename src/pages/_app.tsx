import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import { theme } from '@/contstans';
import { AuthContextProvider } from '~lib/context';

function MyApp({ Component, pageProps }: AppProps<any>): JSX.Element {
	console.info(
		'🚀 ~>  file: _app.tsx ~>  line 9 ~>  MyApp ~>  pageProps',
		pageProps
	);
	const JWToken = pageProps?.Token;

	return (
		<NextUIProvider theme={theme}>
			<AuthContextProvider JWToken={JWToken}>
				<Component {...pageProps} />
			</AuthContextProvider>
		</NextUIProvider>
	);
}

export default MyApp;
