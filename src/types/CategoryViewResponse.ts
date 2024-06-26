import { Status } from "./type.enum";

export default interface CategoryViewResponse {
    id: number;
    categoryName: string;
    status: boolean;
    services: ServiceViewDetailsResponse[];
}

export const initialCategoryViewResponse: CategoryViewResponse = {
    id: 0,
    categoryName: "",
    status: false,
    services: []
};

interface ServiceViewDetailsResponse {
    id: number;
    serviceName: string;
    description: string;
    unitOfPrice: string;
    minimumPrice: number;
    maximumPrice: number;
    duration: number;
    serviceType: string;
    status: Status;
}

const initialServiceViewDetailsResponse: ServiceViewDetailsResponse = {
    id: 0,
    serviceName: "",
    description: "",
    unitOfPrice: "",
    minimumPrice: 0,
    maximumPrice: 0,
    duration: 0,
    serviceType: "",
    status: Status.INACTIVE
};