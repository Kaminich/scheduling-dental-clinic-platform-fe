import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useDentists = () => {
    const api = new ApiClient<any>('/dentists');
    // if (type === 'get') {
    return useQuery({
        queryKey: ["getDentists"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => data.data)
    });
    // } else if (type === 'post') {
    //     return useQuery({
    //         queryKey: ["createDentists"],
    //         queryFn: () =>
    //             api.create(data).then((data) => data.data)
    //     });
    // } else if (type === 'put') {
    //     return useQuery({
    //         queryKey: ["updateDentists"],
    //         queryFn: () =>
    //             api.update(data).then((data) => data.data)
    //     });
    // }

    // If none of the conditions are met, return an empty object to avoid undefined issues.
};

export default useDentists;
