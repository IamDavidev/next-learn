export function isSSr({ url, resolvedUrl }: any): boolean {
	return url === resolvedUrl;
}
