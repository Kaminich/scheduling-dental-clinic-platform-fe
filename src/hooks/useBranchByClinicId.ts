import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: number;
}

const useBranchByClinicId = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/branch/clinic');
    return useQuery({
        queryKey: ["getBranchByClinic", clinicId],
        queryFn: () =>
            api.getDetail(clinicId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useBranchByClinicId;
