import Category from "./CategoryResponse";
import ClinicBranch from "./ClinicBranch";
import ClinicOwner, { ClinicOwnerInit } from "./ClinicOwner";
import Service from "./Service";
import Slot from "./Slot";
import WorkingHours from "./WorkingHours";
import { Status } from "./type.enum";

export default interface Clinic {
    clinicId: number;
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
    createdDate: string;
    modifiedDate?: string;
    // clinicOwner: ClinicOwner['id'];
    ownerName: ClinicOwner['fullName']
    clinicBranch: ClinicBranch[];
    categories: Category[];
    services: Service[];
    workingHours: WorkingHours[];
    slots: Slot[];
}

export const ClinicInit: Clinic = {
    clinicId: 0,
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
    status: Status.INACTIVE,
    createdDate: '',
    modifiedDate: '',
    ownerName: ClinicOwnerInit.fullName,
    clinicBranch: [],
    categories: [],
    services: [],
    workingHours: [],
    slots: []
};