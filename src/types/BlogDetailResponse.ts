import { Status } from "./type.enum";

export default interface BlogDetailResponse {
    id: number;
    title: string;
    summary: string;
    content: string;
    thumbnail: string;
    publishDate: string;
    status: Status;
    createdBy: string;
    publisherName: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    clinicName: string;
}

export const initialBlogDetailResponse: BlogDetailResponse = {
    id: 0,
    title: '',
    summary: '',
    content: '',
    thumbnail: '',
    publishDate: '',
    status: Status.INACTIVE,
    createdBy: '',
    publisherName: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    clinicName: ''
};