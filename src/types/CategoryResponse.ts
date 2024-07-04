import CategoryViewListResponse from "./CategoryViewListResponse";
import CategoryViewResponse from "./CategoryViewResponse";

export default interface CategoryResponse {
    Categories?: CategoryViewListResponse[];
    "Categories by clinic": CategoryViewResponse[];
}