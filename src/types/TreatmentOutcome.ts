import Appointment from "./Appointment";
import Customer from "./Customer";

export default interface TreatmentOutcome {
    id: number,
    diagnosis: string,
    treatmentPlan: string,
    prescription: string,
    recommendations: string,
    createBy: string,
    createDate: Date,
    followUpDate: Date,
    customerId: Customer["id"],
    appointmentId: Appointment["id"]
}