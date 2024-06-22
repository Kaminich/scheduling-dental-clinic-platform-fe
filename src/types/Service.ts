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
    createDate: string,
    lastModifiedDate: string,
    categoryId: Category["id"],
    clinicId: Clinic["id"],
}