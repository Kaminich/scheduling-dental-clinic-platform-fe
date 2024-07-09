import { Status } from "./type.enum";

export default interface BlogListResponse {
    id: number;
    title: string;
    summary: string;
    clinicName: string;
    thumbnail: string;
    createdDate: string;
    modifiedDate: string;
    status: Status;
}