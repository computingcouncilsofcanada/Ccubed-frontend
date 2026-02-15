
export interface UpdateMeRequestDTO {
    instagram_url: string;
    twitter_url: string;
    avatar_url: string;
    about_me: string;
    fun_fact: string;
    linkedin_url: string;
    domains: string[];
    hobbies: string[];
    favorite_song: string;
    journey_at_ccubed: string;
    favorite_quote: string;
    file: File | null;
    discord_url: string;
    username: string;
}

export interface UpdateUserRequest {
    user_id: string;
    details: UpdateMeRequestDTO;
    created_at: string;
    updated_at: string;
}

/** List item from GET /users/update-user-request (includes id and status) */
export interface UpdateUserRequestListItem extends UpdateUserRequest {
    id: string;
    status?: UpdateUserRequestStatus;
}



export interface UpdateUpdateUserRequestDTO {
    update_user_request_id: string;
    status: UpdateUserRequestStatus;
}

export enum UpdateUserRequestStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}