import type { GetServerSideProps, NextPage } from 'next';
import { chekAuthLogged } from '~lib/auth';

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

export const getServerSideProps: GetServerSideProps = ({ req }): any =>
	chekAuthLogged({
		req,
		path: '/login',
	});
