import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import Dentist from "../types/Dentist";

interface Prop {
    type: string;
    id: number;
    data?: Dentist;
}

const useDentists = ({ type, id, data }: Prop) => {
    const api = new ApiClient<any>('/staff');
    if (type === 'get') {
        return useQuery({
            queryKey: ["getStaff"],
            queryFn: () =>
                api.getAuthen()
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'get-detail') {
        return useQuery({
            queryKey: ["getStaffDetail"],
            queryFn: () =>
                api.getDetail(id)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'post') {
        return useQuery({
            queryKey: ["createStaff"],
            queryFn: () =>
                api.create(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'put') {
        return useQuery({
            queryKey: ["updateStaff"],
            queryFn: () =>
                api.update(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else {
        return useQuery({
            queryKey: ["deleteStaff"],
            queryFn: () =>
                api.delete(id)
                    .then((data) => {
                        return data.data;
                    })
        });
    }

};

export default useDentists;
