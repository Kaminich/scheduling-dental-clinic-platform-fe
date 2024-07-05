import { Status } from "./type.enum";

export default interface BranchSummaryResponse {
    branchId: number;
    branchName: string;
    clinicName: string;
    address: string;
    city: string;
    phone: string;
    status: Status;
    createdDate: string;
}
