import { Status } from "./type.enum";

export default interface ClinicListResponse {
    clinicId: number;
    clinicName: string;
    address: string;
    city: string;
    phone: string;
    status: Status;
}