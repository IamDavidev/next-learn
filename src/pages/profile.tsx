import type { GetServerSideProps, NextPage } from 'next';
import { withAuth } from '~lib/auth/withAuth';

const AuthPage: NextPage = (): JSX.Element => {
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
