import {axiosTMDBInstance} from "./tmdb.api.service.ts";
import {IResponseApi} from "../models/IResponseApi.ts";

axiosTMDBInstance.interceptors.request.use(requestObject => {
    if (requestObject.method?.toUpperCase() === 'GET') {
        requestObject.headers.Authorization = `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`;
    }
    return requestObject;
})

export const getData = async <T, >(endpoint: string): Promise<T> => {
    const {data: {results}} = await axiosTMDBInstance.get<IResponseApi & { results: T }>(`${endpoint}`);
    console.log(results)
    return results as T;
}