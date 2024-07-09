import { Status } from "./type.enum";

export default interface ClinicDetailResponse {
    id: number;
    clinicName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    description: string;
    websiteUrl: string;
    logo: string;
    clinicRegistration: string;
    clinicImage: string;
    totalRating: number;
    ownerName: string;
    createdDate: string;
    modifiedDate: string;
    status: Status;
}

export const initialClinicDetailResponse: ClinicDetailResponse = {
    id: 0,
    clinicName: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    description: '',
    websiteUrl: '',
    logo: '',
    clinicRegistration: '',
    clinicImage: '',
    totalRating: 0,
    ownerName: '',
    createdDate: '',
    modifiedDate: '',
    status: Status.INACTIVE,
}