import type { FC } from 'react';

import { Container } from '@nextui-org/react';

interface PropsErrorMessage {
	msg: string;
}

const ErrroMessage: FC<PropsErrorMessage> = ({ msg }): JSX.Element => {
	return (
		<Container
			css={{
				position: 'fixed',
				bottom: '$5',
				right: '$5',
				bg: '$gray300',
				color: '$white',
				p: '1rem 2rem',
				borderRadius: '1rem',
				w: '200px',
			}}>
			{msg}
		</Container>
	);
};

export default ErrroMessage;
