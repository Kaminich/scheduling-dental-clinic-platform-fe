import ClinicBranch, { ClinicBranchInit } from "./ClinicBranch";
import Customer, { CustomerInit } from "./Customer";

export default interface Feedback {
    feedbackId: number;
    comment: string;
    rating: number;
    createdDateTime: string;
    customer: Customer;
    clinicBranch: ClinicBranch;
}

export const FeedbackInit: Feedback = {
    feedbackId: 0,
    comment: '',
    rating: 0,
    createdDateTime: '',
    customer: CustomerInit,
    clinicBranch: ClinicBranchInit,
};