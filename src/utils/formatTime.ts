export const formatTime = (time: string): string => {
    const parts = time.split(':');

    if (parts.length !== 3) {
        throw new Error('Invalid time format. Expected format: HH:MM:SS');
    }

    return `${parts[0]}:${parts[1]}`;
}