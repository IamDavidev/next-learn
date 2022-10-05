// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface DataName {
	name: string;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<DataName>
): void {
	console.log(req);
	res.status(200).json({ name: 'John Doe' });
}
