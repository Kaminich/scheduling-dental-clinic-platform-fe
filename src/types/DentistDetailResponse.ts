import { Status } from "./type.enum";

export default interface DentistDetailResponse {
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
    avatar: string;
    branchName: string;
    city: string;
    branchId: number;
    clinicId: number;
    clinicName: string;
    status: Status;
}

export const initialDentistDetailResponse: DentistDetailResponse = {
    id: 0,
    fullName: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    dob: "",
    gender: "",
    description: "",
    specialty: "",
    experience: "",
    avatar: "",
    branchName: "",
    city: "",
    branchId: 0,
    clinicId: 0,
    clinicName: "",
    status: Status.INACTIVE
};