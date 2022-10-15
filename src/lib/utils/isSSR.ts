import { type NextApiRequest } from 'next';

export function isSSr(
	req: NextApiRequest,
	resolvedUrl: string | undefined
): boolean {
	return req.url === resolvedUrl;
}
