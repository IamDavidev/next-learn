import type { GetServerSideProps, NextPage } from 'next';
import { useContext } from 'react';

import { withAuth } from '~lib/auth/withAuth';
import { AuthContext } from '~lib/context';

const AuthPage: NextPage = (): JSX.Element => {
	const { auth } = useContext(AuthContext);
	console.info('🚀 ~>  file: profile.tsx ~>  line 9 ~>  auth', auth);

	return (
		<>
			<div className='profilePage'>Your are Login </div>
			<style jsx>{`
				.profilePage {
					padding: 1rem;
				}
			`}</style>
		</>
	);
};

export default AuthPage;

export const getServerSideProps: GetServerSideProps = withAuth(() => {
	return {
		props: {},
	};
}, '/login');
