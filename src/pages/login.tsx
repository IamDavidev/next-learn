import type {
	GetServerSideProps,
	InferGetServerSidePropsType,
	NextPage,
} from 'next';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { Button, Container, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';

import ErrroMessage from '~components/ErrroMessage';
import { AuthContext } from '~lib/context';
import { useRouter } from 'next/router';
import { chekAuthPublic } from '~lib/auth';

const VALID_PASSWORD = 'test123';
const ERRRO_MESSAGE = 'Failed to login with Email And Password';

interface InputsUseForm {
	email: string;
	password: string;
}

const LoginPage: NextPage = ({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
	console.info('🚀 ~>  file: login.tsx ~>  line 24 ~>  data', data);
	const router = useRouter();
	const { setAuth } = useContext(AuthContext);

	const { handleSubmit, control } = useForm<InputsUseForm>();
	const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] =
		useState(false);

	const onSubmit = handleSubmit(async (data: InputsUseForm): Promise<void> => {
		const { password, email } = data;

		if (password !== VALID_PASSWORD) {
			console.error('Invalid Data');
			setError(true);
			setTimeout((): void => {
				setError(false);
			}, 3000);
		}

		const dataUser = {
			email,
			password,
		};

		try {
			await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify(dataUser),
			})
				.then(async res => await res.json())
				.then(data => {
					console.log(data);
					localStorage.setItem('isAuth', JSON.stringify(true));
					setAuth(true);
				});

			await router.push('/profile');
		} catch (err) {
			console.error('Error', err);
			throw new Error("Errro : Can't Login");
		}
	});

	return (
		<Container
			css={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				w: '100%',
				minHeight: '100vh',
				flexDirection: 'row',
			}}>
			<form id='form_login' onSubmit={onSubmit}>
				<Container
					css={{
						d: 'flex',
						gap: '$1',
						flexDirection: 'column',
					}}>
					<Controller
						name='email'
						control={control}
						defaultValue='...'
						render={({ field }): JSX.Element => (
							<label>
								<Input
									{...field}
									clearable
									bordered
									labelPlaceholder='Name'
									id='name_form'
									type='text'
								/>
							</label>
						)}
					/>
					<Controller
						name={'password'}
						control={control}
						defaultValue='password'
						render={({ field }): JSX.Element => (
							<Input
								{...field}
								id='password_form'
								css={{ my: '4rem' }}
								type='password'
								clearable
								bordered
								labelPlaceholder='password'
								autoComplete='off'
							/>
						)}
					/>

					<Button
						id='button_form'
						type='submit'
						css={{
							background: '$white',
							color: '$black',
							fontWeight: '$bold',
						}}>
						Default
					</Button>
				</Container>
			</form>
			<Container>{error && <ErrroMessage msg={ERRRO_MESSAGE} />}</Container>
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps<any> = ({ req }): any =>
	chekAuthPublic({
		req,
		path: '/',
	});

export default LoginPage;
