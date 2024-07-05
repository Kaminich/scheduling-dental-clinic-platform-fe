import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useClinicAccounts = () => {
    const api = new ApiClient<any>('/clinics/all');
    return useQuery({
        queryKey: ["clinicAccounts"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useClinicAccounts;
