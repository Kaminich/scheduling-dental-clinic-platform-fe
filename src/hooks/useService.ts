import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import Service from "../types/Service";

interface Prop {
    type: string;
    id: number;
    data?: Service;
}

const useServices = ({ type, id, data }: Prop) => {
    const api = new ApiClient<any>('/service');
    if (type === 'get') {
        return useQuery({
            queryKey: ["getServices"],
            queryFn: () =>
                api.getAuthen()
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'post') {
        return useQuery({
            queryKey: ["createServices"],
            queryFn: () =>
                api.create(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'put') {
        return useQuery({
            queryKey: ["updateServices"],
            queryFn: () =>
                api.update(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else {
        return useQuery({
            queryKey: ["deleteServices"],
            queryFn: () =>
                api.delete(id)
                    .then((data) => {
                        return data.data;
                    })
        });
    }

};

export default useServices;
