import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import Category from "../types/Category";

interface Prop {
    type: string;
    id: number;
    data?: Category;
}

const useService = ({ type, id, data }: Prop) => {
    const api = new ApiClient<any>('/category');
    if (type === 'get') {
        return useQuery({
            queryKey: ["getCategory"],
            queryFn: () =>
                api.getAuthen()
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'post') {
        return useQuery({
            queryKey: ["createCategory"],
            queryFn: () =>
                api.create(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else if (type === 'put') {
        return useQuery({
            queryKey: ["updateCategory"],
            queryFn: () =>
                api.update(data)
                    .then((data) => {
                        return data.data;
                    })
        });
    } else {
        return useQuery({
            queryKey: ["deleteCategory"],
            queryFn: () =>
                api.delete(id)
                    .then((data) => {
                        return data.data;
                    })
        });
    }

};

export default useService;
