/**
 * this middleware is run in all pages.
 *
 *
 */
export default function middleware(req: any): void {
	console.log('Middleware', req.cookies);
}
