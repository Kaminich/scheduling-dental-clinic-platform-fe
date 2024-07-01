import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useReports = () => {
    const api = new ApiClient<any>('/report/all');
    return useQuery({
        queryKey: ["getReports"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useReports;
