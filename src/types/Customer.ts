import Appointment from "./Appointment";
import Feedback from "./Feedback";
import TreatmentOutcome from "./TreatmentOutcome";

export default interface Customer {
    id?: number;
    username: string;
    fullName: string;
    email: string;
    address: string;
    phone: string;
    dob: string;
    gender: string;
    avatar?: string;
    status?: boolean;
    appointments?: Appointment[];
    feedbacks?: Feedback[];
    treatmentOutcomes?: TreatmentOutcome[];
}

export const CustomerInit: Customer = {
    id: 0,
    username: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
};