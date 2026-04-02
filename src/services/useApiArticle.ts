import { privateAxios } from "@/lib/axios";
import { CreateArticleDTO, UpdateArticleDTO } from "@/types/article.interface";
import { useCallback } from "react";

export const useApiArticle = () => {
  const getArticles = useCallback(
    async (
      limit: number = 10,
      offset: number = 0,
      search?: string,
      councilId?: string,
      status?: number
    ) => {
      const params: Record<string, string | number> = {};
      if (limit) params.limit = limit;
      if (offset) params.offset = offset;
      if (search) params.search = search;
      if (councilId) params.council_id = councilId;
      if (status) params.status = status;
      const response = await privateAxios.get(`/articles`, { params });
      return response.data;
    },
    []
  );

  const getArticle = useCallback(async (id: string) => {
    const response = await privateAxios.get(`/articles/${id}`);
    return response.data;
  }, []);

  const createArticle = useCallback(async (data: CreateArticleDTO) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("thumbnail", data.thumbnail);
    if (data.hero_image) {
      formData.append("hero_image", data.hero_image);
    }
    formData.append("description", data.description);
    formData.append("authors", data.authors.join(","));
    if (data.tags) {
      formData.append("tags", data.tags.join(","));
    }
    formData.append("slug", data.slug);
    formData.append("status", data.status.toString());
    formData.append("read_minutes", data.read_minutes?.toString() || "");
    formData.append("council_id", data.council_id);
    if (data.share_links) {
      formData.append("share_links", JSON.stringify(data.share_links));
    }
    formData.append("content", data.content);
    const response = await privateAxios.post("/articles", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }, []);

  const updateArticle = useCallback(async (id: string, data: UpdateArticleDTO) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("thumbnail", data.thumbnail);
    if (data.hero_image) {
      formData.append("hero_image", data.hero_image);
    }
    formData.append("description", data.description);
    formData.append("authors", data.authors.join(","));
    if (data.tags) {
      formData.append("tags", data.tags.join(","));
    }
    formData.append("slug", data.slug);
    formData.append("status", data.status.toString());
    formData.append("read_minutes", data.read_minutes?.toString() || "");
    formData.append("council_id", data.council_id);
    if (data.share_links) {
      formData.append("share_links", JSON.stringify(data.share_links));
    }
    formData.append("content", data.content);
    const response = await privateAxios.patch(`/articles/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }, []);

  const deleteArticle = useCallback(async (id: string) => {
    const response = await privateAxios.delete(`/articles/${id}`);
    return response.data;
  }, []);

  return { getArticles, getArticle, createArticle, updateArticle, deleteArticle };
};
