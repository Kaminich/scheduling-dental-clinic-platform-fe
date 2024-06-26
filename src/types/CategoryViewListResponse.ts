export default interface CategoryViewListResponse {
    id: number;
    categoryName: string;
    status: boolean;
}

export const initialCategoryViewListResponse: CategoryViewListResponse = {
    id: 0,
    categoryName: '',
    status: false
}
