import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const usePendingStaffs = () => {
    const api = new ApiClient<any>('/staff/pending');
    return useQuery({
        queryKey: ["pendingStaffs"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default usePendingStaffs;
