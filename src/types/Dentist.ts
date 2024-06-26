import Appointment from "./Appointment";
import ClinicBranch, { ClinicBranchInit } from "./ClinicBranch";
import { Status } from "./type.enum";

export default interface Dentist {
    id: number;
    fullName: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    dob: string;
    gender: string;
    description: string;
    specialty: string;
    experience: string;
    avatar?: string;
    status: Status;
    appointments: Appointment[];
    clinicBranch: ClinicBranch;
}

export const DentistInit: Dentist = {
    id: 0,
    fullName: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
    gender: '',
    description: '',
    specialty: '',
    experience: '',
    avatar: '',
    status: Status.INACTIVE,
    appointments: [],
    clinicBranch: ClinicBranchInit,
};