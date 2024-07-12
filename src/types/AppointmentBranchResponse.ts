export default interface AppointmentBranchResponse {
    appointmentId: number;
    appointmentStatus: string;
    customerId: number;
    customerName: string;
    service: string;
    dentistName: string;
    createdDate: string;
}