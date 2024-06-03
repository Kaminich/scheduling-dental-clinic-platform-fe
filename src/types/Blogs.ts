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
    publishDate: Date,
    status: Status,
    createBy: string,
    createDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    branchId: Branch["id"]
}