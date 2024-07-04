
export default interface ServiceViewListResponse {
    id: number;
    serviceName: string;
    status: boolean;
    createdDate: string;
    modifiedDate: string;
    categoryName: string;
    clinicId: number;
}

// const initialServiceViewListResponse: ServiceViewListResponse = {
//     id: 0,
//     serviceName: "",
//     createdDate: "",
//     modifiedDate: "",
//     categoryName: "",
//     status: false,
//     clinicId: 0
// };