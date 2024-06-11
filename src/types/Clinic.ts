import ClinicOwner from "./ClinicOwner";

export default interface Clinic extends ClinicOwner {
    id: number,
    clinicName: string,
    address: string,
    city: string,
    phoneNumber: string,
    email: string,
    description: string,
    logo: URL,
    totalRating: number,
    createBy: string,
    createDate: string,
    lastModifiedBy: string,
    lastModifiedDate: string,
    clinicOwnerId: ClinicOwner["id"]
}