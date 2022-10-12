export const onSubmit = ({
    handl;
}) => {
	handleSubmit(async (data: InputsUseForm): Promise<void> => {
		const { password, email } = data;
		console.info(
			'🚀 ~>  file: login.tsx ~>  line 35 ~>  onSubmit ~>  password',
			password
		);

		if (password !== VALID_PASSWORD) {
			console.error('Invalid Data');
			setError(true);
			setTimeout((): void => {
				setError(false);
			}, 3000);
			return;
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
				});

			await router.push('/profile');
		} catch (err) {
			console.error('Error', err);
			throw new Error("Errro : Can't Login");
		}
	});
};
