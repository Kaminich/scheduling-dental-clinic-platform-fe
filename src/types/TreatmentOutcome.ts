import Appointment, { AppointmentInit } from "./Appointment";
import Customer, { CustomerInit } from "./Customer";

export default interface TreatmentOutcome {
    id: number;
    diagnosis: string;
    treatmentPlan: string;
    prescription: string;
    recommendations: string;
    followUpDate: string;
    createdBy: string;
    createdDate: string;
    modifiedBy?: string;
    modifiedDate?: string;
    appointment: Appointment;
    customer: Customer;
}

export const TreatmentOutcomeInit: TreatmentOutcome = {
    id: 0,
    diagnosis: '',
    treatmentPlan: '',
    prescription: '',
    recommendations: '',
    followUpDate: '',
    createdBy: '',
    createdDate: '',
    appointment: AppointmentInit,
    customer: CustomerInit,
};