import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import { theme } from '@/contstans';
import { AuthContextProvider } from '~lib/context';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	console.log('render My app ');
	return (
		<NextUIProvider theme={theme}>
			<AuthContextProvider>
				<Component {...pageProps} />
			</AuthContextProvider>
		</NextUIProvider>
	);
}

export default MyApp;
