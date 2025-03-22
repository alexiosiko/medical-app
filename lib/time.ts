export function formatDate(date: Date | undefined | null): string {
	if (!date)
		return "N/A";
	return new Date(date)?.toLocaleString()
}