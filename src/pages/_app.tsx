import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import { AuthContextProvider } from '~lib/context';
import { theme } from '~constants/theme';

function MyApp({ Component, pageProps }: AppProps<any>): JSX.Element {
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
