import Blog from "./Blog";
import ClinicBranch, { ClinicBranchInit } from "./ClinicBranch";
import { Status } from "./type.enum";

export default interface ClinicStaff {
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
    blogs: Blog[];
    clinicBranch: ClinicBranch;
}

export const ClinicStaffInit: ClinicStaff = {
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
    blogs: [],
    clinicBranch: ClinicBranchInit // Assuming it's nullable
};