import { Container } from '@nextui-org/react';
import Link from 'next/link';
import { type FC } from 'react';

const Navbar: FC = (): JSX.Element => {
	return (
		<>
			<Container
				css={{
					display: 'flex',
					justifyContent: 'space-between',
					w: '100%',
					alignItems: 'center',
					padding: '1rem',
				}}>
				<Link href={'/'}>
					<a>Home</a>
				</Link>
				<Link href={'/login'}>
					<a>Login</a>
				</Link>
				<Link href={'/profile'}>
					<a>Profile</a>
				</Link>
			</Container>
		</>
	);
};

export default Navbar;
