import type { NextPage } from 'next';

import Link from 'next/link';
import { Container } from '@nextui-org/react';

import { PageLayout } from '@/layouts';
import { withStandard } from '~lib/auth/withStandard';

const Home: NextPage = (data: any): JSX.Element => {
	console.info('🚀 ~>  file: index.tsx ~>  line 10 ~>  data', data);
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

export const getServerSideProps = withStandard(({ cookieAuthToken }) => {
	console.info(
		'🚀 ~>  file: index.tsx ~>  line 28 ~>  getServerSideProps ~>  cookieAuthToken',
		cookieAuthToken
	);
	return {
		props: {
			isAuth: true,
			token: cookieAuthToken,
		},
	};
});

export default Home;
