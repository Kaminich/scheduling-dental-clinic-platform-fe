import BranchSummaryResponse from "./BranchSummaryResponse";
import DentistViewListResponse from "./DentistViewListResponse";
import ServiceViewListResponse from "./ServiceViewListResponse";
import SlotDetailsResponse from "./SlotDetailResponse";

export default interface AppointmentViewDetailsResponse {
    appointmentId: number;
    appointmentStatus: string;
    customerId: number;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    dob: string;
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

