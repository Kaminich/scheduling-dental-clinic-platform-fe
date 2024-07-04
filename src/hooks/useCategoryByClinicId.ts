import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: string
}

const useCategoryByClinicId = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/category');
    return useQuery({
        queryKey: ["getCategoryByClinic", clinicId],
        queryFn: () =>
            api.getUnauthen({
                params: {
                    clinicId
                }
            })
                .then((data) => {
                    return data.data["Categories by clinic"];
                })
    });
};

export default useCategoryByClinicId;
