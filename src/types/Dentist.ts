import Branch from "./Branch";

enum Status {
    Pending = "Pending",
    Active = "Active",
    Inactive = "Inactive"
}

export default interface Dentist {
    id: number;
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string;
    dob: string;
    description: string,
    specialty: string,
    experience: string,
    avatar: URL;
    status: Status;
    branchClinicId: Branch['id']
}