import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    appointmentId: number;
}

const useTreatmentOutcomeDetail = ({ appointmentId }: Prop) => {
    const api = new ApiClient<any>('/treatment-outcomes/appointment');
    return useQuery({
        queryKey: ["getTreatmentOutcomeDetail", appointmentId],
        queryFn: () =>
            api.getDetail(appointmentId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useTreatmentOutcomeDetail;
