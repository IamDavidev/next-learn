import type { NextPage } from 'next';

import Link from 'next/link';
import { Container } from '@nextui-org/react';

import { PageLayout } from '@/layouts';
import { withStandardGSSP } from '~lib/auth/withStandardGSSP';

const Home: NextPage = (data: any): JSX.Element => {
	return (
		<>
			<PageLayout title={'Learn Next'} description={'Learn Next With '}>
				<Container css={{ padding: '3rem' }}>
					<div></div>
					{data.isAuth === true ? (
						<>
							<Link href={'/profile'}>Go to Profile</Link>
						</>
					) : (
						<>
							<Link href={'/login'}>Go to Login</Link>
						</>
					)}
				</Container>
			</PageLayout>
		</>
	);
};

export const getServerSideProps = withStandardGSSP();

export default Home;
