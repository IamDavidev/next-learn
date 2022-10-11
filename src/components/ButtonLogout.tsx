import type { FC } from 'react';
import { Button } from '@nextui-org/react';
import { METHODS_TYPE } from '~pages/api/login';
import { type NextRouter, useRouter } from 'next/router';

export async function Logout(router: NextRouter): Promise<void> {
	await fetch('/api/logout', {
		method: METHODS_TYPE._POST,
	})
		.then(res => {
			res.ok && router.push('/');
		})
		.catch(err => {
			console.error(err);
			throw new Error(err);
		});
}

const ButtonLogout: FC<any> = (): JSX.Element => {
	const router: NextRouter = useRouter();
	return (
		<>
			<Button onClick={async (): Promise<void> => await Logout(router)}>
				Logout
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='feather feather-log-out'>
					<path d='M16 17L21 12 16 7'></path>
					<path d='M21 12H9'></path>
				</svg>
			</Button>
		</>
	);
};

export default ButtonLogout;
