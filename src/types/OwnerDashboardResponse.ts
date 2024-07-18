export default interface OwnerDashboardResponse {
    numberOfAppointments: number;
    numberOfPendingAppointments: number;
    numberOfDoneAppointments: number;
    numberOfCanceledAppointments: number;
    numberOfClinicUsers: number;
    numberOfClinicDentists: number;
    numberOfClinicStaffs: number;
    numberOfClinicFeedbacks: number;
}

export const initialOwnerDashboardResponse: OwnerDashboardResponse = {
    numberOfAppointments: 0,
    numberOfPendingAppointments: 0,
    numberOfDoneAppointments: 0,
    numberOfCanceledAppointments: 0,
    numberOfClinicUsers: 0,
    numberOfClinicDentists: 0,
    numberOfClinicStaffs: 0,
    numberOfClinicFeedbacks: 0
};
