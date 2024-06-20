import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const usePendingClinics = () => {
    const api = new ApiClient<any>('/clinics/pending');
    return useQuery({
        queryKey: ["pendingClinics"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default usePendingClinics;
