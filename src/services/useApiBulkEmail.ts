import { privateAxios } from "@/lib/axios";
import {
  CreateBulkEmailDTO,
} from "@/types/email.interface";
import { useCallback } from "react";

export const useApiBulkEmail = () => {
  const parseUpload = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await privateAxios.post(
      `/bulk-emails/parse-upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  }, []);

  const parseSheet = useCallback(
    async (sheetUrlOrId: string, range?: string) => {
      const response = await privateAxios.post(`/bulk-emails/parse-sheet`, {
        sheet_url_or_id: sheetUrlOrId,
        ...(range ? { range } : {}),
      });
      return response.data;
    },
    [],
  );

  const createBulkEmail = useCallback(
    async (data: CreateBulkEmailDTO) => {
      const response = await privateAxios.post(`/bulk-emails`, data);
      return response.data;
    },
    [],
  );

  const listBulkEmails = useCallback(
    async (limit: number = 50, offset: number = 0, status?: string) => {
      const params: Record<string, string | number> = {};
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (status) params.status = status;
      const response = await privateAxios.get(`/bulk-emails`, { params });
      return response.data;
    },
    [],
  );

  const getBulkEmail = useCallback(async (id: string) => {
    const response = await privateAxios.get(`/bulk-emails/${id}`);
    return response.data;
  }, []);

  const confirmBulkEmail = useCallback(
    async (id: string, dryRun: boolean = false) => {
      const response = await privateAxios.post(
        `/bulk-emails/${id}/confirm`,
        {},
        { params: dryRun ? { dry_run: "true" } : {} },
      );
      return response.data;
    },
    [],
  );

  const cancelBulkEmail = useCallback(async (id: string) => {
    const response = await privateAxios.post(
      `/bulk-emails/${id}/cancel`,
      {},
    );
    return response.data;
  }, []);

  const deleteBulkEmail = useCallback(async (id: string) => {
    const response = await privateAxios.delete(`/bulk-emails/${id}`);
    return response.data;
  }, []);

  return {
    parseUpload,
    parseSheet,
    createBulkEmail,
    listBulkEmails,
    getBulkEmail,
    confirmBulkEmail,
    cancelBulkEmail,
    deleteBulkEmail,
  };
};
