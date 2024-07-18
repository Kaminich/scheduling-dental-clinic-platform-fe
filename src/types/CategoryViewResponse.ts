import { Status } from "./type.enum";

export default interface CategoryViewResponse {
    id: number;
    categoryName: string;
    categoryImage: string;
    status: boolean;
    services: ServiceViewDetailsResponse[];
}

export const initialCategoryViewResponse: CategoryViewResponse = {
    id: 0,
    categoryName: "",
    categoryImage: "",
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