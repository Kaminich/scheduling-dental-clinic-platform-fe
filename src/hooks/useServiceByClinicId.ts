import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: number;
}

const useServiceByClinicId = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/service');
    return useQuery({
        queryKey: ["getServiceByClinic", clinicId],
        queryFn: () =>
            api.getAuthen({
                params: {
                    clinicId
                }
            })
                .then((data) => {
                    return data.data;
                })
    });
};

export default useServiceByClinicId;
