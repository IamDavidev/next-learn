import type { NextPage } from 'next';

import Link from 'next/link';
import { Container } from '@nextui-org/react';

import { PageLayout } from '@/layouts';

const Home: NextPage = (): JSX.Element => {
	return (
		<>
			<PageLayout title={'Learn Next'} description={'Learn Next With '}>
				<Container css={{ padding: '3rem' }}>
					<>
						<Link href={'/profile'}>Go to Profile</Link>
					</>
					<br />
					<>
						<Link href={'/login'}>Go to Login</Link>
					</>
				</Container>
			</PageLayout>
		</>
	);
};

export default Home;
