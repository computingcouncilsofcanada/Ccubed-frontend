import { privateAxios } from "@/lib/axios";
import {
  CreateEmailTemplateDTO,
  UpdateEmailTemplateDTO,
} from "@/types/email.interface";

export const getEmailTemplates = async (
  limit: number = 50,
  offset: number = 0,
  search?: string
) => {
  const params: Record<string, string | number> = {};
  if (limit) params.limit = limit;
  if (offset) params.offset = offset;
  if (search) params.search = search;
  const response = await privateAxios.get(`/email-templates`, { params });
  return response.data;
};

export const getEmailTemplate = async (id: string) => {
  const response = await privateAxios.get(`/email-templates/${id}`);
  return response.data;
};

export const createEmailTemplate = async (data: CreateEmailTemplateDTO) => {
  const response = await privateAxios.post(`/email-templates`, data);
  return response.data;
};

export const updateEmailTemplate = async (
  id: string,
  data: UpdateEmailTemplateDTO
) => {
  const response = await privateAxios.patch(`/email-templates/${id}`, data);
  return response.data;
};

export const deleteEmailTemplate = async (id: string) => {
  const response = await privateAxios.delete(`/email-templates/${id}`);
  return response.data;
};
