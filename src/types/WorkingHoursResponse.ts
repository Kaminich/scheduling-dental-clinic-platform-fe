import { DayInWeek } from "./type.enum";

export default interface WorkingHoursResponse {
    day: DayInWeek;
    startTime: string;
    endTime: string;
    clinicId: number;
    status: boolean;
}