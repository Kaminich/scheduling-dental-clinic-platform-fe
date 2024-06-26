import { Status } from "./type.enum";

export default interface StaffDetailResponse {
    id: number;
    fullName: string;
    email: string;
    username: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
    avatar: string;
    status: Status;
    clinicBranchName: string;
}

export const initialStaffDetailResponse: StaffDetailResponse = {
    id: 0,
    fullName: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    avatar: "",
    status: Status.INACTIVE,
    clinicBranchName: ""
};