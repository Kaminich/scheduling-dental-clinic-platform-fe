import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";

interface Prop {
    appointmentId: number;
}

const useAppointmentDetail = ({ appointmentId }: Prop) => {
    const api = new ApiClient<any>('/appointment');
    return useQuery({
        queryKey: ["getAppointmentDetail", appointmentId],
        queryFn: () =>
            api.getDetail(appointmentId)
                .then((data) => {
                    return data.data;
                })
    });
};

export default useAppointmentDetail;
