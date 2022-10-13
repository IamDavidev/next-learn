export function isSSr({
	url,
	host,
}: {
	url: string | URL;
	host: string | URL;
}): boolean {
	const urlFormated = new URL(url, host);

	const urlSSR = urlFormated.pathname.endsWith('.json');

	if (!urlSSR) return false;
	return true;
}
