import { Status } from "./type.enum";

export default interface StaffSummaryResponse {
    id: number;
    fullName: string;
    username: string;
    phone: string;
    gender: string;
    clinicBranchName: string;
    status: Status;
}