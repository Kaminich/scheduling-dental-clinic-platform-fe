import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: number;
}

const useDentistByClinicId = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/dentists/clinic');
    return useQuery({
        queryKey: ["getDentistByClinic", clinicId],
        queryFn: () =>
            api.getDetailUnauthen(clinicId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useDentistByClinicId;
