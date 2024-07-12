import AppointmentViewDetailsResponse from "./AppointmentViewDetailsResponse";
import AppointmentViewListResponse from "./AppointmentViewListResponse";

export default interface AppointmentResponse {
    'Appointment History': AppointmentViewListResponse[];
    'Current Appointment': AppointmentViewDetailsResponse[];
}

export const initialAppointmentResponse: AppointmentResponse = {
    'Appointment History': [],
    'Current Appointment': [],
}