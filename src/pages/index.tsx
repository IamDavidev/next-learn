import type { NextPage } from 'next';

import Link from 'next/link';
import { Button, Container } from '@nextui-org/react';

import { PageLayout } from '@/layouts';

const Home: NextPage = (): JSX.Element => {
	console.log('render Home page');
	return (
		<>
			<PageLayout title={'Learn Next'} description={'Learn Next With '}>
				<Container css={{ padding: '1rem 0' }}>
					<Button
						css={{
							background: '$white',
							color: '$black',
							fontWeight: '$bold',
						}}>
						Default
					</Button>
					<Link href={'/login'}>Go to Login</Link>
				</Container>
			</PageLayout>
		</>
	);
};

export default Home;
