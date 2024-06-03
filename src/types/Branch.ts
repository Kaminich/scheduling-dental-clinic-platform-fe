import Clinic from "./Clinic";

enum Status {
    Pending = "Pending",
    Active = "Active",
    Inactive = "Inactive"
}

export default interface Branch {
    id: number,
    branchName: string,
    address: string,
    city: string,
    phoneNumber: string,
    totalRating: number,
    status: Status,
    createBy: string,
    createDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    clinicId: Clinic["id"]
}