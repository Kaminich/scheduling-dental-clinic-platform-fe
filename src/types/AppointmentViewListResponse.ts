import { AppointmentStatus } from "./type.enum";

export default interface AppointmentViewListResponse {
    appointmentId: number;      // Use number for Long type
    appointmentDate: string;    // Use string for date in "YYYY-MM-DD" format
    createdDate: string;        // Use string for date-time in "YYYY-MM-DDTHH:mm:ss" format
    appointmentStatus: AppointmentStatus;
}