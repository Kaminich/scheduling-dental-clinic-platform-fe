import Clinic, { ClinicInit } from "./Clinic";
import { DayInWeek, Shift } from "./type.enum";

export default interface WorkingHours {
    id: number;
    day: DayInWeek;
    shift: Shift;
    startTime: string;
    endTime: string;
    status: boolean;
    createdDate: string;
    modifiedDate?: string;
    clinic: Clinic;
}

export const WorkingHoursInit: WorkingHours = {
    id: 0,
    day: DayInWeek.MONDAY,
    shift: Shift.MORNING,
    startTime: '',
    endTime: '',
    status: false,
    createdDate: '',
    modifiedDate: '',
    clinic: ClinicInit,
};