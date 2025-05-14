import { method_get, method_post, method_update } from "../js/fech";

export const useFech = ({ url }) => {

    const getDataTable = async () => {
        const response = await method_get(url);
        return response
    }

    const getDataList = async () => {
        const response = await method_get(url);
        return response
    }

    const postDataApi = async (data) => {
        const response = await method_post(url, data);
        return response;
    };

    const updateDataApi = async (data) => {
        const response = await method_update(url, data);
        return response;
    };

    const deleteData = async (data) => {
        const response = await method_update(url, data);
        return response;
    };

    const getInfo = async (data) => {
        const response = await method_get(url);
        return response;
    };

    return {
        getDataTable,
        postDataApi,
        updateDataApi,
        getDataList,
        deleteData,
        getInfo
    }
    
}
