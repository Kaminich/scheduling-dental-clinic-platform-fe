import Branch from "./Branch";

enum Status {
    Pending = "Pending",
    Active = "Active",
    Inactive = "Inactive"
}

export default interface Blogs {
    id: number,
    title: string,
    context: string,
    thumbnail: string,
    publishDate: string,
    status: Status,
    createBy: string,
    createDate: string,
    lastModifiedBy: string,
    lastModifiedDate: string,
    branchId: Branch["id"]
}