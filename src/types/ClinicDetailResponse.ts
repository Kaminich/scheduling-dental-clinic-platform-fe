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
    status: Status;
}