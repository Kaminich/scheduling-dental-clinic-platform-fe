export const formatDateTime = (date: string): string => {
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
        return "Invalid date format. Please provide a valid datetime string.";
    }

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
    };

    return inputDate.toLocaleString("en-GB", options);
}