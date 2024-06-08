import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

const useUserProfile = () => {
    const api = new ApiClient<any>('/auth/user-information');
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: () =>
            api.getAuthen()
                .then((data) => {
                    return data.data;
                })
    });
};

export default useUserProfile;
