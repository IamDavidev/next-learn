import type { NextPage } from 'next';

import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';

import ErrroMessage from '~components/ErrroMessage';
import { useAuth } from '~lib/hooks';
import { withOutAuthGSSP } from '~lib/auth/withOutAuthGSSP';

const VALID_CREDENTIALS = {
	_PASSWORD: 'test',
	_USERNAME: 'davidev',
};
const ERROR_MESSAGE = 'Failed to login with Email And Password';

interface InputsUseForm {
	username: string;
	password: string;
}

function invalidData(setError: any): void {
	console.error('Invalid Data');
	setError(true);
	setTimeout((): void => {
		setError(false);
	}, 3000);
}

const LoginPage: NextPage = (): JSX.Element => {
	const router = useRouter();
	const { Login } = useAuth();

	const { handleSubmit, control } = useForm<InputsUseForm>();
	const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] =
		useState(false);

	const onSubmit = handleSubmit(async (data: InputsUseForm): Promise<void> => {
		const { password, username } = data;

		if (password !== VALID_CREDENTIALS._PASSWORD) return invalidData(setError);
		if (username !== VALID_CREDENTIALS._USERNAME) return invalidData(setError);

		const dataUser = {
			username,
			password,
		};

		try {
			await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify(dataUser),
			})
				.then(async res => await res.json())
				.then(data => {
					const { jwt, username } = data;

					Login(jwt, username);
				});

			await router.push('/profile');
		} catch (err) {
			console.error('Error', err);
			throw new Error("Error : Can't Login");
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
						name='username'
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
			<Container>{error && <ErrroMessage msg={ERROR_MESSAGE} />}</Container>
		</Container>
	);
};

export const getServerSideProps = withOutAuthGSSP();

export default LoginPage;
