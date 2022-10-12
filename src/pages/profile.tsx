import { PageLayout } from '@/layouts';
import type { NextPage } from 'next';
import { useContext } from 'react';

import ButtonLogout from '~components/ButtonLogout';
import { withAuth } from '~lib/auth/withAuth';
import { AuthContext } from '~lib/context';

const AuthPage: NextPage = (): JSX.Element => {
	const { auth } = useContext(AuthContext);
	console.info('🚀 ~>  file: profile.tsx ~>  line 9 ~>  auth', auth);

	return (
		<PageLayout title='profile page' description='profile auth next'>
			<div className='profilePage'>Your are Login </div>
			<ButtonLogout />
			<style jsx>{`
				.profilePage {
					padding: 1rem;
				}
			`}</style>
		</PageLayout>
	);
};

export default AuthPage;

export const getServerSideProps = withAuth(({ cookieAuthToken }) => {
	return {
		props: {
			Token: cookieAuthToken,
		},
	};
}, '/login');
