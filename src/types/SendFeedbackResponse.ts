export default interface SendFeedbackResponse {
    feedbackId: number;
    comment: string;
    rating: number;
    customerFullName: string;
    branchName: string;
    avatar: string;
    city: string;
}