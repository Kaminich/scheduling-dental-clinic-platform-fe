import SendFeedbackResponse from "./SendFeedbackResponse";

export default interface SummaryFeedbackResponse {
    feedbacks: SendFeedbackResponse[];
    averageRating: number;
    totalFeedback: number;
    starRatings: StarRatingResponse[];
}

interface StarRatingResponse {
    star: number,
    count: number
}

export const initialSummaryFeedbackResponse: SummaryFeedbackResponse = {
    feedbacks: [],
    averageRating: 0,
    totalFeedback: 0,
    starRatings: []
};