import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import Feedback from "../types/Feedback";

interface Prop {
    type: string;
    id: number;
    data?: Feedback;
}

const useFeedbacks = ({ type, id, data }: Prop) => {
    if (type === 'get') {
        const api = new ApiClient<any>('/feedback/all');
        return useQuery({
            queryKey: ["getFeedbacks"],
            queryFn: () =>
                api.getUnauthen()
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'post') {
        const api = new ApiClient<any>('/feedback');
        return useQuery({
            queryKey: ["createServices"],
            queryFn: () =>
                api.create(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'getById') {
        const api = new ApiClient<any>('/feedback/branch');
        return useQuery({
            queryKey: ["getFeedbacksById"],
            queryFn: () =>
                api.getDetail(id)
                    .then((data) => {
                        return data.data;
                    })
        });
    }
};

export default useFeedbacks;
