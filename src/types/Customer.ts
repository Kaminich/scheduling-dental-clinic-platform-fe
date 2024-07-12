export default interface Customer {
    id?: number;
    username: string;
    fullName: string;
    email: string;
    address: string;
    phone: string;
    dob: string;
    gender: string;
    avatar?: string;
}

export const CustomerInit: Customer = {
    id: 0,
    username: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: '',
};