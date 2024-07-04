export default interface ServiceViewDetailsResponse {
    id: number;
    serviceName: string;
    description: string;
    unitOfPrice: string;
    minimumPrice: number;
    maximumPrice: number;
    duration: number;
    serviceType: string;
    status: boolean;
    categoryId: number;
    categoryName: string;
}

export const initialServiceViewDetailsResponse: ServiceViewDetailsResponse = {
    id: 0,
    serviceName: "",
    description: "",
    unitOfPrice: "",
    minimumPrice: 0,
    maximumPrice: 0,
    duration: 0,
    serviceType: "",
    status: false,
    categoryId: 0,
    categoryName: '',
};