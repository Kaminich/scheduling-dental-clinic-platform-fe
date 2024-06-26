import ClinicStaff, { ClinicStaffInit } from "./ClinicStaff";
import { Status } from "./type.enum";

export default interface Blog {
    id: number;
    title: string;
    summary: string;
    content: string;
    thumbnail: string;
    publishDate: string;
    status: Status;
    createdBy: string;
    createdDate: string;
    modifiedBy?: string;
    modifiedDate?: string;
    staff: ClinicStaff;
}

export const BlogInit: Blog = {
    id: 0,
    title: '',
    summary: '',
    content: '',
    thumbnail: '',
    publishDate: '',
    status: Status.INACTIVE,
    createdBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    staff: ClinicStaffInit,
};