import Clinic from "./Clinic";

enum Status {
    Pending = "Pending",
    Active = "Active",
    Inactive = "Inactive"
}

export default interface ClinicOwner {
    id: number;
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string;
    dob: Date;
    avatar: string;
    status: Status;
    clinicId: Clinic['id']
}