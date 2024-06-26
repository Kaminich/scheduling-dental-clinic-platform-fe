import Appointment from "./Appointment";
import Clinic, { ClinicInit } from "./Clinic";

export default interface Slot {
    id: number;
    slotNo: number;
    startTime: string;
    endTime: string;
    status: boolean;
    createdBy: string;
    createdDate: string;
    modifiedBy?: string;
    modifiedDate?: string;
    appointment?: Appointment;
    clinic: Clinic;
}

export const SlotInit: Slot = {
    id: 0,
    slotNo: 0,
    startTime: '',
    endTime: '',
    status: false,
    createdBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    clinic: ClinicInit,
};