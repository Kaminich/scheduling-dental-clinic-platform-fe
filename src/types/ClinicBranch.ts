import Appointment from "./Appointment";
import Clinic, { ClinicInit } from "./Clinic";
import ClinicStaff from "./ClinicStaff";
import Dentist from "./Dentist";
import Feedback from "./Feedback";
import { Status } from "./type.enum";

export default interface ClinicBranch {
    branchId: number;
    branchName: string;
    address: string;
    city: string;
    phone: string;
    totalRating: number;
    isMain: boolean;
    status: Status;
    createdDate?: string;
    modifiedDate?: string;
    feedbacks: Feedback[];
    appointments: Appointment[];
    dentists: Dentist[];
    staffs: ClinicStaff[];
    clinic: Clinic;
}

export const ClinicBranchInit: ClinicBranch = {
    branchId: 0,
    branchName: '',
    address: '',
    city: '',
    phone: '',
    totalRating: 0,
    isMain: false,
    status: Status.INACTIVE,
    createdDate: '',
    modifiedDate: '',
    feedbacks: [],
    appointments: [],
    dentists: [],
    staffs: [],
    clinic: ClinicInit
};