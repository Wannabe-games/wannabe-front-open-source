export const daysSinceGivenDate = (dateString: string) => {
    const today = new Date().toISOString().slice(0, 10);
    const endDate = new Date(today);
    const sinceDate = new Date(dateString);
    const dayInSeconds = 24 * 60 * 60 * 1000;

    const daysSince = Math.abs(endDate.getTime() - sinceDate.getTime());

    return Math.round(daysSince / dayInSeconds);
};
