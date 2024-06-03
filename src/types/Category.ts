import Clinic from "./Clinic";

export default interface Category {
    id: number,
    name: string,
    status: boolean,
    createBy: string,
    createDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    clinicId: Clinic["id"]
}