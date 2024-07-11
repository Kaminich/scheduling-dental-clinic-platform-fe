import BranchSummaryResponse, { initialBranchSummaryResponse } from "./BranchSummaryResponse";
import DentistViewListResponse, { initialDentistViewListResponse } from "./DentistViewListResponse";
import ServiceViewListResponse, { initialServiceViewListResponse } from "./ServiceViewListResponse";
import SlotDetailsResponse, { initialSlotDetailsResponse } from "./SlotDetailResponse";

export default interface AppointmentViewDetailsResponse {
    appointmentId: number;
    appointmentStatus: string;
    customerId: number;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    dob: string;
    customerGender: string;
    customerAge: number;
    customerEmail: string;
    appointmentDate: string;
    duration: number;
    slot: SlotDetailsResponse;
    clinicBranch: BranchSummaryResponse;
    dentist: DentistViewListResponse;
    service: ServiceViewListResponse;
    createdDate: string;
}

export const initialAppointmentViewDetailsResponse: AppointmentViewDetailsResponse = {
    appointmentId: 0,
    appointmentStatus: '',
    customerId: 0,
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerGender: '',
    dob: '',
    customerAge: 0,
    customerEmail: '',
    appointmentDate: '',
    duration: 0,
    slot: initialSlotDetailsResponse,
    clinicBranch: initialBranchSummaryResponse,
    dentist: initialDentistViewListResponse,
    service: initialServiceViewListResponse,
    createdDate: ''
};

