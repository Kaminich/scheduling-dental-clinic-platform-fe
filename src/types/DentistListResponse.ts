import { Status } from "./type.enum";

export default interface DentistListResponse {
    dentistId: number;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    branchName: string;
    status: Status;
}

const initialDentistListResponse: DentistListResponse = {
    dentistId: 0,
    fullName: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    branchName: "",
    status: Status.INACTIVE
};