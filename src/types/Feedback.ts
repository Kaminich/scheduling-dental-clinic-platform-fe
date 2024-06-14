import Branch from "./Branch";
import Customer from "./Customer";

export default interface Feedback extends Customer {
    id: number,
    comment: string,
    rating: number,
    status?: boolean,
    createDateTime?: string,
    branchClinicId: Branch["id"]
    userId: Customer['id']
}