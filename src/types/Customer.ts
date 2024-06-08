export default interface Customer {
    id?: number;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    role?: string;
    avatar?: string;
    status?: boolean;
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
    role: '',
    avatar: '',
    status: false,
};