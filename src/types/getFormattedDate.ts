import { TIME_ZONE } from "@/utils/constant";

export const getFormattedDate = (
	date: Date | string | null | undefined
): string | undefined => {
	if (!date) return undefined;

	const dateObj = typeof date === "string" ? new Date(date) : date;

	if (isNaN(dateObj.getTime())) return undefined;

	try {
		return dateObj.toLocaleString("ja-JP", { timeZone: TIME_ZONE });
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
