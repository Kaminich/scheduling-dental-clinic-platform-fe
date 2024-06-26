import Clinic from "./Clinic";
import { Status } from "./type.enum";

export default interface ClinicOwner {
    id: number;
    username: string;
    fullName: string;
    email: string;
    address: string;
    phone: string;
    dob: string;
    gender: string;
    avatar: string;
    status: Status;
    clinic?: Clinic;
}

export const ClinicOwnerInit: ClinicOwner = {
    id: 0,
    username: '',
    fullName: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
    gender: '',
    avatar: '',
    status: Status.INACTIVE,
};