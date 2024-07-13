import SlotDetailsResponse from "./SlotDetailResponse";
import { AppointmentStatus } from "./type.enum";

export default interface AppointmentDentistResponse {
    appointmentId: number;
    appointmentStatus: AppointmentStatus;
    appointmentDate: string;
    slot: SlotDetailsResponse;
    customerId: number;
    customerName: string;
    service: string;
    status: AppointmentStatus;
    treatmentOutcomeId: number;
}
