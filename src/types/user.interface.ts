import { ApiResponse } from "./base";

export interface User {
    school_id: string | null;
    year_of_study: number | null;
    department: string | null;
    avatar: string | null;
    hobbies: string[] | null;
    domains: string[] | null;
    fun_fact: string | null;
    about_me: string | null;
    journey_at_ccubed: string | null;
    favorite_quote: string | null;
    favorite_song: string | null;
    linkedin_url: string | null;
    instagram_url: string | null;
    twitter_url: string | null;
    discord_url: string | null;
    email: string;
    username: string;
    role: string;
    status: number;
    created_at: string;
    updated_at: string;
    is_verified: boolean;
    verify_token: string;
    number_of_login_failed: number;
    has_completed_profile: number;
    id: string;
  };

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
    previous_data: User;
    details: UpdateMeRequestDTO;
    created_at: string;
    updated_at: string;
    status: UpdateUserRequestStatus;
    id: string;
    email: string;
}

export interface UpdateUserRequestDetailResponse extends ApiResponse<UpdateUserRequest> {
    data: UpdateUserRequest;
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