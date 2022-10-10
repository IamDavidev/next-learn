interface PropsLoginEnpoint {
	email: string;
	password: string;
	userName: string;
}

export async function LoginEnpoint({
	email,
	password,
	userName,
}: PropsLoginEnpoint): Promise<any> {
	console.info('🚀 ~>  file: auth.ts ~>  line 12 ~>  userName', userName);
	console.info('🚀 ~>  file: auth.ts ~>  line 12 ~>  password', password);
	console.info('🚀 ~>  file: auth.ts ~>  line 12 ~>  email', email);

	return {
		email,
		password,
	};
}
