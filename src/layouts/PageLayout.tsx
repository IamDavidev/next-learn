import type { ReactNode } from 'react';
import type { NextPage } from 'next';

import Head from 'next/head';

interface PropsPageLayout {
	title: string;
	children: ReactNode;
	description: string;
}

export const PageLayout: NextPage<PropsPageLayout> = ({
	children,
	description,
	title,
}): JSX.Element => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
			</Head>
			<main>{children}</main>
		</>
	);
};
