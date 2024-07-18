export default interface AdminDashboardResponse {
    numberOfDentalClinic: number;
    numberOfPendingDentalClinic: number;
    numberOfActiveDentalClinic: number;
    numberOfInactiveDentalClinic: number;
    numberOfClinicUsers: number;
    numberOfClinicDentists: number;
    numberOfClinicStaffs: number;
    numberOfClinicOwners: number;
    numberOfCustomers: number;
    numberOfBlogs: number;
}

export const initialAdminDashboardResponse: AdminDashboardResponse = {
    numberOfDentalClinic: 0,
    numberOfPendingDentalClinic: 0,
    numberOfActiveDentalClinic: 0,
    numberOfInactiveDentalClinic: 0,
    numberOfClinicUsers: 0,
    numberOfClinicDentists: 0,
    numberOfClinicStaffs: 0,
    numberOfClinicOwners: 0,
    numberOfCustomers: 0,
    numberOfBlogs: 0
};
