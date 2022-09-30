import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import { theme } from '@/contstans';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<NextUIProvider theme={theme}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}

export default MyApp;
