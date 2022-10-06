export function generateExpireCookie(): Date {
	const now: Date = new Date();
	const time: number = now.getTime();
	const expireTime: number = time + 1000 * generateDaysFormat(5);

	now.setTime(expireTime);

	return now;
}

export const generateDaysFormat = (days: number): number => days * 36000;
