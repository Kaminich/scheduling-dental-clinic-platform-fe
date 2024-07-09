import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useAllClinics = () => {
    const api = new ApiClient<any>('/clinics');
    return useQuery({
        queryKey: ["getAllClinics"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useAllClinics;
