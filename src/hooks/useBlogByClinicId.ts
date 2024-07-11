import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: number;
}

const useBlogByClinicId = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/blog/clinic');
    return useQuery({
        queryKey: ["getBlogByClinic", clinicId],
        queryFn: () =>
            api.getDetail(clinicId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useBlogByClinicId;
