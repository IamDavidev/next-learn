export function generateExpireCookie(): Date {
	const now: Date = new Date();
	const time: number = now.getTime();
	const expireTime: number = time + 10000 * 36000;
	now.setTime(expireTime);
	return now;
}
