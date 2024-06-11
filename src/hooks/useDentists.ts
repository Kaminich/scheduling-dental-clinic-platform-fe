import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import Dentist from "../types/Dentist";

interface Prop {
    type: string;
    id: number;
    data?: Dentist;
}

const useDentists = ({ type, id, data }: Prop) => {
    const api = new ApiClient<any>('/dentists');
    if (type === 'get') {
        return useQuery({
            queryKey: ["getDentists"],
            queryFn: () =>
                api.getAuthen()
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'get-detail') {
        return useQuery({
            queryKey: ["getDentistsDetail"],
            queryFn: () =>
                api.getDetail(id)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'post') {
        return useQuery({
            queryKey: ["createDentists"],
            queryFn: () =>
                api.create(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'put') {
        return useQuery({
            queryKey: ["updateDentists"],
            queryFn: () =>
                api.update(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else {
        return useQuery({
            queryKey: ["deleteDentists"],
            queryFn: () =>
                api.delete(id)
                    .then((data) => {
                        return data.data;
                    })
        });
    }

};

export default useDentists;
