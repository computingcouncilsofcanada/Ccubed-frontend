import { ApiResponse } from "./base";

export interface EmailGroup {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by?: string | null;
}

export interface EmailGroupMember {
  id: string;
  group_id: string;
  email: string;
  user_id?: string | null;
  created_at: string;
  created_by?: string;
}

export interface CreateEmailGroupDto {
  name: string;
  description?: string;
}

export interface UpdateEmailGroupDto {
  name?: string;
  description?: string;
}

export interface CreateEmailGroupMemberDto {
  email?: string;
  user_id?: string;
}

export interface EmailGroupsListResponse {
  data: EmailGroup[];
  totalPage?: number;
  totalRecord?: number;
  message: string;
  status?: number;
}

export interface EmailGroupResponse extends ApiResponse<EmailGroup> {
  data: EmailGroup;
}

export interface EmailGroupMembersResponse extends ApiResponse<EmailGroupMember[]> {
  data: EmailGroupMember[];
}

export interface EmailGroupEmailsResponse extends ApiResponse<string[]> {
  data: string[];
}
