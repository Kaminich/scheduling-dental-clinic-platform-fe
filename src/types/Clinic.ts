import ClinicOwner from "./ClinicOwner";

export default interface Clinic {
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
    createDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    clinicOwnerId: ClinicOwner["id"]
}