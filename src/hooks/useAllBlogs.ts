import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useAllBlogs = () => {
    const api = new ApiClient<any>('/blog/all');
    return useQuery({
        queryKey: ["getAllBlogs"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useAllBlogs;
