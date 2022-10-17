import { PageLayout } from '@/layouts';
import { Container, Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useContext } from 'react';

import ButtonLogout from '~components/ButtonLogout';
import { withAuthGSSP } from '~lib/auth/withAuthGSSP';
import { AuthContext } from '~lib/context';

const AuthPage: NextPage = (): JSX.Element => {
	const { auth } = useContext(AuthContext);
	console.info('🚀 ~>  file: profile.tsx ~>  line 12 ~>  auth', auth);

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
				<Image
					src={auth.user.avatar}
					layout='responsive'
					width={200}
					height={150}
					alt={auth.user.name}
				/>
				<img src={auth.user.avatar} />
				<div>Your are Login </div>
				<Text>TOKEN : {auth.jwt}</Text>
				<ButtonLogout />
			</Container>
		</PageLayout>
	);
};

export default AuthPage;

export const getServerSideProps = withAuthGSSP();
