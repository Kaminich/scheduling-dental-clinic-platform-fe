import Clinic from "./Clinic";
import ClinicBranch from "./ClinicBranch";
import ClinicOwner from "./ClinicOwner";
import { Status } from "./type.enum";

export default interface ApproveClinicResponse extends Clinic, ClinicBranch, ClinicOwner {
    clinicName: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    websiteUrl: string;
    logo: string;
    clinicRegistration: string;
    clinicImage: string;
    status: Status;
}