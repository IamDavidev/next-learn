import type { GetServerSideProps, NextPage } from 'next';
import { chekAuthLogged } from '~lib/auth';

const AuthPage: NextPage = (): JSX.Element => {
	return (
		<>
			<div>
				<h1>Auth Page</h1>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<any> = ({ req }): any =>
	chekAuthLogged({
		req,
		path: '/login',
	});

export default AuthPage;
