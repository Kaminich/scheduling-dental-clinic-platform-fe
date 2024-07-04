export default interface CategoryViewListResponse {
    id: number;
    categoryName: string;
    categoryImage: string;
    createdDate: string;
    modifiedDate: string;
    status: boolean;
}

export const initialCategoryViewListResponse: CategoryViewListResponse = {
    id: 0,
    categoryName: '',
    categoryImage: '',
    createdDate: '',
    modifiedDate: '',
    status: false
}
