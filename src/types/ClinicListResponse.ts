import { Status } from "./type.enum";

export default interface ClinicListResponse {
    clinicId: number;
    clinicName: string;
    logo: string;
    address: string;
    city: string;
    phone: string;
    ownerName: string;
    createdDate: string;
    modifiedDate: string;
    status: Status;
    feedbackCount: number;
    totalRating: number;
}

export const initialClinicListResponse: ClinicListResponse = {
    clinicId: 0,
    clinicName: '',
    logo: '',
    address: '',
    city: '',
    phone: '',
    ownerName: '',
    createdDate: '',
    modifiedDate: '',
    status: Status.INACTIVE,
    feedbackCount: 0,
    totalRating: 0,
}