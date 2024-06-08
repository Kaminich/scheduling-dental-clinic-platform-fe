import Branch from "./Branch";

enum Status {
    Pending = "Pending",
    Active = "Active",
    Inactive = "Inactive"
}

export default interface ClinicStaff {
    id: number;
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string;
    dob: string;
    avatar: string;
    status: Status;
    branchId: Branch['id']
}