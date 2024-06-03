import Branch from "./Branch";

export default interface Slot {
    id: string,
    slotNo: number,
    startTime: Date,
    endTime: Date,
    slotDate: Date,
    createBy: string,
    createDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    status: boolean,
    brandId: Branch['id']
}