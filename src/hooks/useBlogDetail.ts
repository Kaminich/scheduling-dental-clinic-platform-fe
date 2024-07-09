import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    blogId: number;
}

const useBlogDetail = ({ blogId }: Prop) => {
    const api = new ApiClient<any>('/blog');
    return useQuery({
        queryKey: ["getBlogDetail", blogId],
        queryFn: () =>
            api.getDetail(blogId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useBlogDetail;
