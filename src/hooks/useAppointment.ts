import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useAppointment = () => {
    const api = new ApiClient<any>('/appointment/branch');
    return useQuery({
        queryKey: ["getAppointmentBranch"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useAppointment;
