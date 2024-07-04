export default interface CategoryViewListResponse {
    id: number;
    categoryName: string;
    categoryImage: string;
    status: boolean;
}

export const initialCategoryViewListResponse: CategoryViewListResponse = {
    id: 0,
    categoryName: '',
    categoryImage: '',
    status: false
}
