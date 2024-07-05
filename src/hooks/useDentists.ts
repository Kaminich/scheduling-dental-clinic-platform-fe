import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useDentists = () => {
    const api = new ApiClient<any>('/dentists');
    return useQuery({
        queryKey: ["getDentists"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => data.data)
    });
};

export default useDentists;
