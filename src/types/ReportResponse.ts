import { ReportReason } from "./type.enum";

export default interface ReportResponse {
    reportId: number;
    feedbackId: number;
    reportReason: ReportReason[];
    reporter: string;
    reportedCustomer: string;
    createdDateTime: string;
    clinicId: number;
    branchId: number;
    avatar: string;
    fullName: string;
    branchName: string;
    city: string;
    comment: string;
    rating: number;
    averageRating: number;
    totalFeedback: number;
}

export const initialReportResponse: ReportResponse = {
    reportId: 0,
    feedbackId: 0,
    reportReason: [],
    reporter: '',
    reportedCustomer: '',
    createdDateTime: '',
    clinicId: 0,
    branchId: 0,
    avatar: '',
    fullName: '',
    branchName: '',
    city: '',
    comment: '',
    rating: 0,
    averageRating: 0,
    totalFeedback: 0
};