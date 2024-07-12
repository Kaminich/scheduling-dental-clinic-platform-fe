export const formatDateMonth = (date: string): string => {
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) {
        return "Invalid date format. Please provide a valid datetime string.";
    }

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Ho_Chi_Minh",
    };

    return inputDate.toLocaleString("en-GB", options);
}
