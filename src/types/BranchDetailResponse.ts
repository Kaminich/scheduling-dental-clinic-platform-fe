import { Status } from "./type.enum";

export default interface BranchDetailResponse {
    branchId: number;
    branchName: string;
    address: string;
    city: string;
    phone: string;
    totalRating: number;
    isMain: boolean;
    createdDate: string;
    modifiedDate: string;
    clinicName: string;
    status: Status;
}

export const initialBranchDetailResponse: BranchDetailResponse = {
    branchId: 0,
    branchName: '',
    address: '',
    city: '',
    phone: '',
    totalRating: 0,
    isMain: false,
    createdDate: '',
    modifiedDate: '',
    clinicName: '',
    status: Status.INACTIVE
};