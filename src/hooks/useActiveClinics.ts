import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useActiveClinics = () => {
    const api = new ApiClient<any>('/clinics/active');
    return useQuery({
        queryKey: ["getActiveClinics"],
        queryFn: () =>
            api.getUnauthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useActiveClinics;
