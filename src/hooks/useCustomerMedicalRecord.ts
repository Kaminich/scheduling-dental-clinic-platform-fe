import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    username: string;
}

const useCustomerMedicalRecord = ({ username }: Prop) => {
    const api = new ApiClient<any>('/treatment-outcomes/customer');
    return useQuery({
        queryKey: ["getCustomerMedicalRecord"],
        queryFn: () =>
            api.getAuthen({
                params: {
                    username
                }
            })
                .then((data) => {
                    return data;
                })
    });
};

export default useCustomerMedicalRecord;
