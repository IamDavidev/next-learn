import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '~constants/theme';
import { AuthContextProvider } from '~lib/context';

function MyApp({ Component, pageProps }: AppProps<any>): JSX.Element {
	const JWToken = pageProps?.token;
	const dehydratedState = pageProps?.dehydratedState;
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<NextUIProvider theme={theme}>
				<AuthContextProvider JWToken={JWToken}>
					<Hydrate state={dehydratedState}>
						<Component {...pageProps} />
					</Hydrate>
				</AuthContextProvider>
			</NextUIProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
