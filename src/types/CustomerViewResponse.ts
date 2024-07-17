export default interface CustomerViewResponse {
    id: number;
    username: string;
    fullName: string;
    email: string;
    address: string;
    phone: string;
    dob: string;
    gender: string;
    avatar: string;
    status: boolean;
}

export const initialCustomerViewResponse: CustomerViewResponse = {
    id: 0,
    username: '',
    fullName: '',
    email: '',
    address: '',
    phone: '',
    dob: '',
    gender: '',
    avatar: '',
    status: false
};
