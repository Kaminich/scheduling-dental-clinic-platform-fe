import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    clinicId: number;
}

const useFeedbacks = ({ clinicId }: Prop) => {
    const api = new ApiClient<any>('/feedback/clinic');
    return useQuery({
        queryKey: ["getFeedbacksByClinic"],
        queryFn: () =>
            api.getDetail(clinicId)
                .then((data) => {
                    return data.data;
                })
    });

};

export default useFeedbacks;
