export interface ErrWithMessage {
    message?: string;
}

export interface AxiosErrLike {
    response?: { data?: { message?: string } };
}