import DentistListResponse from "./DentistListResponse";
import StaffSummaryResponse from "./StaffSummaryResponse";

export default interface ClinicStaffAndDentistResponse {
    staffList: StaffSummaryResponse[];
    dentistList: DentistListResponse[];
}

export const initialClinicStaffAndDentistResponse: ClinicStaffAndDentistResponse = {
    staffList: [],
    dentistList: [],
}