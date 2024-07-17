import { Status } from "./type.enum";

export interface OwnerViewResponse {
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
    clinicId: number;
    clinicName: string;
}

export const initialOwnerViewResponse: OwnerViewResponse = {
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
    clinicId: 0,
    clinicName: ''
};

