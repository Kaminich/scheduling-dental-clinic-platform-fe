import Appointment from "./Appointment";
import Category, { CategoryInit } from "./Category"
import Clinic, { ClinicInit } from "./Clinic"
import { Status } from "./type.enum";

export default interface Service {
    id: number;
    serviceName: string;
    description: string;
    unitOfPrice: string;
    minimumPrice: number;
    maximumPrice: number;
    duration: number;
    serviceType: string;
    status: Status;
    createdBy: string;
    createdDate: string;
    modifiedBy?: string;
    modifiedDate?: string;
    appointments: Appointment[];
    category: Category;
    clinic: Clinic;
}

export const ServiceInit: Service = {
    id: 0,
    serviceName: '',
    description: '',
    unitOfPrice: '',
    minimumPrice: 0,
    maximumPrice: 0,
    duration: 0,
    serviceType: '',
    status: Status.INACTIVE,
    createdBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    appointments: [],
    category: CategoryInit,
    clinic: ClinicInit,
};