import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useCustomerAppointment = () => {
    const api = new ApiClient<any>('/appointment');
    return useQuery({
        queryKey: ["getCustomerAppointment"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useCustomerAppointment;
