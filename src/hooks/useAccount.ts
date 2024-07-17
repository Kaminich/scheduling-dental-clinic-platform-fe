import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useAccount = () => {
    const api = new ApiClient<any>('/accounts');
    return useQuery({
        queryKey: ["accounts"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useAccount;
