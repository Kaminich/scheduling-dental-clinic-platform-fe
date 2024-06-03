import Category from "./Category"
import Clinic from "./Clinic"

enum Status {
    Pending = "Pending",
    Active = "Active",
    Inactive = "Inactive"
}

export default interface Service {
    id: number,
    name: string,
    description: string,
    minimunPrice: number,
    maximumPrice: number,
    type: string,
    status: Status
    createBy: string,
    createDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    categoryId: Category["id"],
    clinicId: Clinic["id"],
}