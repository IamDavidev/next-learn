import type { FC } from 'react';
import { Button } from '@nextui-org/react';

const ButtonLogout: FC<any> = (): JSX.Element => {
	return (
		<>
			<Button>
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
