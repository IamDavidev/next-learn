import { PageLayout } from '@/layouts';
import { Container, Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import { useContext } from 'react';

import ButtonLogout from '~components/ButtonLogout';
import { withAuthGSSP } from '~lib/auth/withAuthGSSP';
import { AuthContext } from '~lib/context';

const AuthPage: NextPage = (): JSX.Element => {
	const { auth } = useContext(AuthContext);

	return (
		<PageLayout title='profile page' description='profile auth next'>
			<Container
				css={{
					d: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					w: '100%',
					gap: '$10',
					flexDirection: 'column',
				}}>
				<div>Your are Login </div>
				<Text>TOKEN : {auth.jwt}</Text>
				<ButtonLogout />
			</Container>
		</PageLayout>
	);
};

export default AuthPage;

export const getServerSideProps = withAuthGSSP(({ cookieAuthToken }) => {
	return {
		props: {
			Token: cookieAuthToken,
		},
	};
});
