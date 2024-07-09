import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useBlogs = () => {
    const api = new ApiClient<any>('/blog');
    return useQuery({
        queryKey: ["getBlogs"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useBlogs;
