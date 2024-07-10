import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useActiveBlogs = () => {
    const api = new ApiClient<any>('/blog/active');
    return useQuery({
        queryKey: ["getActiveBlogs"],
        queryFn: () =>
            api.getUnauthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useActiveBlogs;
