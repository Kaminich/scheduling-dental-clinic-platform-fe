import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: number;
}

const useWorkingHoursByClinicId = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/working-hours');
    return useQuery({
        queryKey: ["getWorkingHoursByClinic", clinicId],
        queryFn: () =>
            api.getDetailUnauthen(clinicId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useWorkingHoursByClinicId;
