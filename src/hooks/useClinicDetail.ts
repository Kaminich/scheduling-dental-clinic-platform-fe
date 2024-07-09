import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: number;
}

const useClinicDetail = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/clinics');
    return useQuery({
        queryKey: ["getClinicDetail", clinicId],
        queryFn: () =>
            api.getDetail(clinicId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useClinicDetail;
