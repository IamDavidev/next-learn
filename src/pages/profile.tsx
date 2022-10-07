import type { GetServerSideProps, NextPage } from 'next';

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

export const getServerSideProps: GetServerSideProps = ({ req }): any => {
	const { cookies } = req;

	const tokenCookies: string | undefined = cookies.AUTH_TOKEN;

	if (tokenCookies === undefined) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {
			isToken: tokenCookies,
		},
	};
};
