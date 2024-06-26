import Clinic, { ClinicInit } from "./Clinic";
import Service from "./Service";

export default interface Category {
    id: number;
    categoryName: string;
    status: boolean;
    createdBy: string;
    createdDate: string;
    modifiedBy?: string;
    modifiedDate?: string;
    services: Service[];
    clinic: Clinic;
}

export const CategoryInit: Category = {
    id: 0,
    categoryName: '',
    status: false,
    createdBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    services: [],
    clinic: ClinicInit,
};