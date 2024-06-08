import Appointment from "./Appointment";
import Customer from "./Customer";

export default interface TreatmentOutcome {
    id: number,
    diagnosis: string,
    treatmentPlan: string,
    prescription: string,
    recommendations: string,
    createBy: string,
    createDate: string,
    followUpDate: string,
    customerId: Customer["id"],
    appointmentId: Appointment["id"]
}