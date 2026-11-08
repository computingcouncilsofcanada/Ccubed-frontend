export interface CreateArticleDTO {
    title: string;
    /** New upload (`File`) or existing URL string on update */
    thumbnail: File | Blob | string;
    hero_image?: File | Blob | string;
    description: string;
    authors: string[];
    tags?: string[];
    slug: string;
    status: number;
    read_minutes?: number;
    council_id: string;
    share_links?: ArticleShareLink[] | null;
    content: string;
}

export interface Article {
    id: string;
    title: string;
    thumbnail_url: string;
    hero_image_url?: string;
    description: string;
    authors: string[];
    tags?: string[];
    slug: string;
    status: number;
    read_minutes?: number;
    council_id: string;
    share_links?: ArticleShareLink[] | null;
    content: string;
    created_at: string;
    updated_at: string;
}


export type UpdateArticleDTO = CreateArticleDTO;

export interface ArticleShareLink {
    icon: string;
    url: string;
}