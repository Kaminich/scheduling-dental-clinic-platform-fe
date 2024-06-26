import ClinicBranch, { ClinicBranchInit } from "./ClinicBranch";
import Customer, { CustomerInit } from "./Customer";
import Dentist, { DentistInit } from "./Dentist";
import Service, { ServiceInit } from "./Service";
import Slot, { SlotInit } from "./Slot";
import TreatmentOutcome from "./TreatmentOutcome";

export default interface Appointment {
    id: number;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    customerDob: string;
    customerAge: number;
    customerEmail: string;
    appointmentDate: string;
    duration: number;
    status: string;
    createdDate: string;
    treatmentOutcome?: TreatmentOutcome;
    slot: Slot;
    customer: Customer;
    clinicBranch: ClinicBranch;
    dentist: Dentist;
    service: Service;
}

export const AppointmentInit: Appointment = {
    id: 0,
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerDob: '',
    customerAge: 0,
    customerEmail: '',
    appointmentDate: '',
    duration: 0,
    status: '',
    createdDate: '',
    slot: SlotInit,
    customer: CustomerInit,
    clinicBranch: ClinicBranchInit,
    dentist: DentistInit,
    service: ServiceInit,
};