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
    modifiedDate: string;
    main: boolean;
}

export const initialBranchSummaryResponse: BranchSummaryResponse = {
    branchId: 0,
    branchName: '',
    clinicName: '',
    address: '',
    city: '',
    phone: '',
    status: Status.INACTIVE,
    createdDate: '',
    modifiedDate: '',
    main: false
};
