import { ReportReason } from "./type.enum";

export default interface ReportResponse {
    reportId: number;
    feedbackId: number;
    reportReason: ReportReason;
    reporter: string;
    reportedCustomer: string;
    createdDateTime: string;
    clinicId: number;
    branchId: number;
}

export const initialReportResponse: ReportResponse = {
    reportId: 0,
    feedbackId: 0,
    reportReason: ReportReason.SPAM, // Default to a specific enum value
    reporter: '',
    reportedCustomer: '',
    createdDateTime: '',
    clinicId: 0,
    branchId: 0
};