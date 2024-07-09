import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const usePendingBlogs = () => {
    const api = new ApiClient<any>('/blog/pending');
    return useQuery({
        queryKey: ["getPendingBlogs"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default usePendingBlogs;
