export default interface UserInformationResponse {
    username: string;
    fullName: string;
    email: string;
    gender: string;
    phone: string;
    dob: string;
    address: string;
    avatar: string;
    role: string;
}

export const initialUserInformationResponse: UserInformationResponse = {
    username: "",
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    dob: "",
    address: "",
    avatar: "",
    role: ""
};