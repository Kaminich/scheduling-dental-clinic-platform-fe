import AppointmentViewDetailsResponse from "./AppointmentViewDetailsResponse";
import AppointmentViewListResponse from "./AppointmentViewListResponse";

export default interface AppointmentResponse {
    'Appointments history of clinic branch': AppointmentViewListResponse,
    'Current appointments of clinic branch': AppointmentViewDetailsResponse,
}