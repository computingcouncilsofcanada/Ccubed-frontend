// Shared API response envelope shape
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
    count: number;
}