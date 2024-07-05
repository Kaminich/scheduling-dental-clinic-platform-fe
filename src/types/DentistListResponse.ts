import { Status } from "./type.enum";

export default interface DentistListResponse {
    dentistId: number;
    avatar: string;
    fullName: string;
    username: string;
    branchName: string;
    specialty: string;
    city: string;
    branchId: number;
    clinicName: string;
    status: Status;
}

// const initialDentistListResponse: DentistListResponse = {
//     dentistId: 0,
//     fullName: "",
//     username: "",
//     email: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     branchName: "",
//     status: Status.INACTIVE
// };