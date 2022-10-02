import { Button, Container, Input, Text } from '@nextui-org/react';

import type { NextPage } from 'next';
import { Dispatch, SetStateAction, useContext, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { AuthContext } from '~lib/context';

const VALID_PASSWORD = 'test123';

interface InputsUseForm {
	email: string;
	password: string;
}

const LoginPage: NextPage = (): JSX.Element => {
	const { handleSubmit, control } = useForm<InputsUseForm>();
	const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] =
		useState(false);
	const { setAuth } = useContext(AuthContext);

	const onSubmit = handleSubmit((data: InputsUseForm) => {
		const { password } = data;

		if (password !== VALID_PASSWORD) return console.error('Invalid Data');

		localStorage.setItem('isAuth', JSON.stringify(true));
		// only test : ---
		document.cookie = 'isAuth:True';
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
							<Input
								{...field}
								clearable
								bordered
								labelPlaceholder='Name'
								id='name_form'
								type='text'
							/>
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
			<Container></Container>
		</Container>
	);
};

export default LoginPage;
