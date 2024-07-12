import AppointmentDentistResponse from "./AppointmentDentistResponse";

export default interface AppointmentDentistViewListResponse {
    day: string;
    appointments: AppointmentDentistResponse[];
}