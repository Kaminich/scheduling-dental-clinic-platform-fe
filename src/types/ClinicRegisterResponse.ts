import { Status } from "./type.enum";

export default interface ClinicRegisterResponse {
    clinicId: number;
    clinicName: string;
    address: string;
    city: string;
    phone: string;
    clinicRegistration: string;
    websiteUrl: string;
    clinicImage: string;
    clinicStatus: Status;
    ownerDetail: OwnerRegisterResponse;
}

interface OwnerRegisterResponse {
    fullName: string;
    email: string;
    phone: string;
}

export const initialClinicRegisterResponse: ClinicRegisterResponse = {
    clinicId: 0,
    clinicName: '',
    address: '',
    city: '',
    phone: '',
    clinicRegistration: '',
    websiteUrl: '',
    clinicImage: '',
    clinicStatus: Status.INACTIVE,
    ownerDetail: {
        fullName: '',
        email: '',
        phone: ''
    }
};