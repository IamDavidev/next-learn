import { PageLayout } from '@/layouts';
import { Button, Container } from '@nextui-org/react';
import type { NextPage } from 'next';

const Home: NextPage = (): JSX.Element => {
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
				</Container>
			</PageLayout>
		</>
	);
};

export default Home;
