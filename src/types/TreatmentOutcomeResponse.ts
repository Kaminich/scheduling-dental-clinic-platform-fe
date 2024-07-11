export default interface TreatmentOutcomeResponse {
    id: number;
    diagnosis: string;
    treatmentPlan: string;
    prescription: string;
    recommendations: string;
    followUpDate: string;
    createdBy: string;
    modifiedBy: string;
    appointmentId: number;
    customerId: number;
}

export const initialTreatmentOutcomeResponse: TreatmentOutcomeResponse = {
    id: 0,
    diagnosis: '',
    treatmentPlan: '',
    prescription: '',
    recommendations: '',
    followUpDate: '',
    createdBy: '',
    modifiedBy: '',
    appointmentId: 0,
    customerId: 0
};
