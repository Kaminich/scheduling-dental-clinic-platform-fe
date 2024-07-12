export default interface SlotDetailsResponse {
    slotId: number;
    slotNo: number;
    startTime: string;
    endTime: string;
    status: boolean;
}

export const initialSlotDetailsResponse: SlotDetailsResponse = {
    slotId: 0,
    slotNo: 0,
    startTime: '',
    endTime: '',
    status: false
};
