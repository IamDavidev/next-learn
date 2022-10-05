import type { NextPage } from 'next';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { Button, Container, Input } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';

import ErrroMessage from '~components/ErrroMessage';
import { AuthContext } from '~lib/context';

const VALID_PASSWORD = 'test123';
const ERRRO_MESSAGE = 'Failed to login with Email And Password';

interface InputsUseForm {
	email: string;
	password: string;
}

const LoginPage: NextPage = (): JSX.Element => {
	const { handleSubmit, control } = useForm<InputsUseForm>();

	const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] =
		useState(false);
	const { setAuth } = useContext(AuthContext);

	const onSubmit = handleSubmit((data: InputsUseForm): void => {
		const { password } = data;

		if (password !== VALID_PASSWORD) {
			console.error('Invalid Data');

			setError(true);

			setTimeout((): void => {
				setError(false);
			}, 3000);
		}

		localStorage.setItem('isAuth', JSON.stringify(true));
		setAuth(true);
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
								// {...register(FORM_NAMES.PASSWORD)}
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

export default LoginPage;
