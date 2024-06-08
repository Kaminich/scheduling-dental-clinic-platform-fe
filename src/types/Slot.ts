import Branch from "./Branch";

export default interface Slot {
    id: string,
    slotNo: number,
    startTime: string,
    endTime: string,
    slotDate: string,
    createBy: string,
    createDate: string,
    lastModifiedBy: string,
    lastModifiedDate: string,
    status: boolean,
    brandId: Branch['id']
}