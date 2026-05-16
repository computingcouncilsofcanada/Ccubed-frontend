import { privateAxios } from "@/lib/axios";
import {
    GetUsersParams,
    UpdateMeRequestDTO,
    UpdateUserRequestDetailResponse,
    UpdateUserRequestStatus,
    UsersListResponse,
} from "@/types/user.interface";


export const updateMe = async (data: UpdateMeRequestDTO) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("position", data.position);
    formData.append("instagram_url", data.instagram_url);
    formData.append("twitter_url", data.twitter_url);
    formData.append("avatar_url", data.avatar_url);
    formData.append("about_me", data.about_me);
    formData.append("fun_fact", data.fun_fact);
    formData.append("linkedin_url", data.linkedin_url);
    data.domains?.forEach((domain) => {
        formData.append("domains", domain);
    });
    data.hobbies?.forEach((hobby) => {
        formData.append("hobbies", hobby);
    });
    formData.append("favorite_song", data.favorite_song);
    formData.append("journey_at_ccubed", data.journey_at_ccubed);
    formData.append("favorite_quote", data.favorite_quote);
    if (data.file) {
        formData.append("file", data.file);
    }
    formData.append("discord_url", data.discord_url);
    const res = await privateAxios.patch("/users/me", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const getAllUpdateUserRequests = async (
    status?: UpdateUserRequestStatus,
    limit?: number,
    offset?: number
) => {
    const params: Record<string, string | number> = {};
    if (status != null) params.status = status;
    if (limit != null) params.limit = limit;
    if (offset != null) params.offset = offset;
    const res = await privateAxios.get("/users/update-user-requests", {
        params,
    });
    return res.data;
};

export const getUpdateUserRequestById = async (
    id: string
): Promise<UpdateUserRequestDetailResponse> => {
    const res = await privateAxios.get<UpdateUserRequestDetailResponse>(`/users/update-user-requests/${id}`);
    return res.data;
};


export const updateUserRequestStatus = async (
    id: string,
    status: UpdateUserRequestStatus
) => {
    const res = await privateAxios.patch(`/users/update-user-requests/${id}`, {
        status,
    });
    return res.data;
};

export const checkEmailExists = async (email: string) => {
    const res = await privateAxios.get(`/users/check-email/${email}`, {
    });
    return res.data;
};

export const getUsers = async (params: GetUsersParams = {}): Promise<UsersListResponse> => {
    const query: Record<string, string | number | boolean> = {};
    if (params.limit != null) query.limit = params.limit;
    if (params.offset != null) query.offset = params.offset;
    if (params.role) query.role = params.role;
    if (params.status != null) query.status = params.status;
    if (params.is_verified != null) query.is_verified = params.is_verified;
    if (params.username) query.username = params.username;
    if (params.email) query.email = params.email;

    const res = await privateAxios.get<UsersListResponse>("/users", { params: query });
    return res.data;
};

