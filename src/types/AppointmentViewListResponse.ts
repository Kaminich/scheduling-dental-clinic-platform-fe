import { AppointmentStatus } from "./type.enum";

export default interface AppointmentViewListResponse {
    appointmentId: number;
    appointmentDate: string;
    createdDate: string;
    appointmentStatus: AppointmentStatus;
}