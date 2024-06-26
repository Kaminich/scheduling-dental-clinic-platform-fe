import { Status } from "./type.enum";

export default interface ServiceViewListResponse {
    id: number;
    serviceName: string;
    status: Status;
    clinicId: number;
}

const initialServiceViewListResponse: ServiceViewListResponse = {
    id: 0,
    serviceName: "",
    status: Status.INACTIVE,
    clinicId: 0
};