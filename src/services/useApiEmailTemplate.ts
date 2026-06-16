import { privateAxios } from "@/lib/axios";
import {
  CreateEmailTemplateDTO,
  UpdateEmailTemplateDTO,
} from "@/types/email.interface";
import { useCallback } from "react";

export const useApiEmailTemplate = () => {
  const getEmailTemplates = useCallback(
    async (limit: number = 50, offset: number = 0, search?: string) => {
      const params: Record<string, string | number> = {};
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (search) params.search = search;
      const response = await privateAxios.get(`/email-templates`, { params });
      return response.data;
    },
    [],
  );

  const getEmailTemplate = useCallback(async (id: string) => {
    const response = await privateAxios.get(`/email-templates/${id}`);
    return response.data;
  }, []);

  const createEmailTemplate = useCallback(
    async (data: CreateEmailTemplateDTO) => {
      const response = await privateAxios.post(`/email-templates`, data);
      return response.data;
    },
    [],
  );

  const updateEmailTemplate = useCallback(
    async (id: string, data: UpdateEmailTemplateDTO) => {
      const response = await privateAxios.patch(
        `/email-templates/${id}`,
        data,
      );
      return response.data;
    },
    [],
  );

  const deleteEmailTemplate = useCallback(async (id: string) => {
    const response = await privateAxios.delete(`/email-templates/${id}`);
    return response.data;
  }, []);

  return {
    getEmailTemplates,
    getEmailTemplate,
    createEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
  };
};
