import Clinic from "./Clinic";

export default interface Category {
    id: number,
    name: string,
    status: boolean,
    createBy: string,
    createDate: string,
    lastModifiedBy: string,
    lastModifiedDate: string,
    clinicId: Clinic["id"]
}