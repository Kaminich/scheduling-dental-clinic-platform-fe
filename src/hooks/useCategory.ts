import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useCategory = () => {
    const api = new ApiClient<any>('/category');
    return useQuery({
        queryKey: ["getCategory"],
        queryFn: () =>
            api.getUnauthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useCategory;
