import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const usePendingDentists = () => {
    const api = new ApiClient<any>('/dentists/pending');
    return useQuery({
        queryKey: ["pendingDentists"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default usePendingDentists;
