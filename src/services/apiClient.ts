/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-empty */
import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
    success: boolean;
    data: T[];
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + '/api/menu',
});

axios.interceptors.response.use(async (res: any) => {
    if (res.status === 401) {
        window.localStorage.removeItem("fullname")
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("access_token")
        window.location.replace('http://localhost:5173');
    } else {
        return res;
    }
});

class ApiClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    getAll = (config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<FetchResponse<T>>(this.endpoint, {}, config)
            .then((res) => res.data);
    };

    get = (id: number | string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<T>(this.endpoint + '/' + id, {}, config)
            .then((res) => res.data);
    };

    create = (data: T, config?: AxiosRequestConfig) => {
        return axiosInstance
            .post<T>(this.endpoint, data, config)
            .then((res) => res.data);
    };
    createWithFile = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data);
    };

    update = (id: number | string, data: T, config?: AxiosRequestConfig) => {
        return axiosInstance
            .put<T>(this.endpoint + '/' + id, data, config)
            .then((res) => res.data);
    };

    delete = (id: number | string, config?: AxiosRequestConfig) => {
        return axiosInstance
            .delete<T>(this.endpoint + '/' + id, config)
            .then((res) => res.data);
    };
}

export default ApiClient;
