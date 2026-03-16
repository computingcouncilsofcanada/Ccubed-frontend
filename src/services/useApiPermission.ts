
import { privateAxios } from "@/lib/axios";

export const useApiPermission = () => {

    const fetchMyPermissions = async () => {
        const response = await privateAxios.get('/permission/me');
        return response.data;
    };

    return {
        fetchMyPermissions,
    };
};