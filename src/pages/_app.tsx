import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import { theme } from '@/contstans';
import { AuthContextProvider } from '~lib/context';

function MyApp({ Component, pageProps }: AppProps<any>): JSX.Element {
	const isToken = Boolean(pageProps.isToken);

	return (
		<NextUIProvider theme={theme}>
			<AuthContextProvider isToken={isToken}>
				<Component {...pageProps} />
			</AuthContextProvider>
		</NextUIProvider>
	);
}

export default MyApp;
