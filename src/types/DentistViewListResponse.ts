export default interface DentistViewListResponse {
    dentistId: number;
    dentistName: string;
}

export const initialDentistViewListResponse: DentistViewListResponse = {
    dentistId: 0,
    dentistName: '',
};