import SlotDetailsResponse from "./SlotDetailResponse";
import { DayInWeek } from "./type.enum"

export default interface WorkingHoursDetailsResponse {
    day: DayInWeek;
    slots: SlotDetailsResponse[];
}

export const initialWorkingHoursDetailsResponse: WorkingHoursDetailsResponse = {
    day: DayInWeek.MONDAY,
    slots: []
}