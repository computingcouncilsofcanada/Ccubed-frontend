import { privateAxios } from "@/lib/axios";
import {
  CreateEmailGroupDto,
  CreateEmailGroupMemberDto,
  EmailGroupMembersResponse,
  EmailGroupResponse,
  EmailGroupsListResponse,
  UpdateEmailGroupDto,
} from "@/types/email-group.interface";

export interface GetEmailGroupsParams {
  limit?: number;
  offset?: number;
  name?: string;
}

export const createEmailGroup = async (data: CreateEmailGroupDto) => {
  const res = await privateAxios.post<EmailGroupResponse>("/email-groups", data);
  return res.data;
};

export const getEmailGroups = async (
  params: GetEmailGroupsParams = {}
): Promise<EmailGroupsListResponse> => {
  const res = await privateAxios.get<EmailGroupsListResponse>("/email-groups", {
    params,
  });
  return res.data;
};

export const getEmailGroupById = async (id: string) => {
  const res = await privateAxios.get<EmailGroupResponse>(`/email-groups/${id}`);
  return res.data;
};

export const updateEmailGroup = async (id: string, data: UpdateEmailGroupDto) => {
  const res = await privateAxios.patch<EmailGroupResponse>(`/email-groups/${id}`, data);
  return res.data;
};

export const deleteEmailGroup = async (id: string) => {
  const res = await privateAxios.delete(`/email-groups/${id}`);
  return res.data;
};

export const addEmailGroupMember = async (
  groupId: string,
  data: CreateEmailGroupMemberDto
) => {
  const res = await privateAxios.post(`/email-groups/${groupId}/members`, data);
  return res.data;
};

export const getEmailGroupMembers = async (groupId: string) => {
  const res = await privateAxios.get<EmailGroupMembersResponse>(
    `/email-groups/${groupId}/members`
  );
  return res.data;
};

export const removeEmailGroupMember = async (groupId: string, memberId: string) => {
  const res = await privateAxios.delete(
    `/email-groups/${groupId}/members/${memberId}`
  );
  return res.data;
};
