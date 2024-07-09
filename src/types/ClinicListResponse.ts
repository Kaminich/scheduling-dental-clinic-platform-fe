import { Status } from "./type.enum";

export default interface ClinicListResponse {
    clinicId: number;
    clinicName: string;
    address: string;
    city: string;
    phone: string;
    ownerName: string;
    createdDate: string;
    modifiedDate: string;
    status: Status;
}

export const initialClinicListResponse: ClinicListResponse = {
    clinicId: 0,
    clinicName: '',
    address: '',
    city: '',
    phone: '',
    ownerName: '',
    createdDate: '',
    modifiedDate: '',
    status: Status.INACTIVE,
}