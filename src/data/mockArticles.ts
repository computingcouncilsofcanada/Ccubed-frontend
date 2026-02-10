export interface IArticleSection {
  type: "text" | "heading" | "list" | "image" | "images";
  heading?: string;
  content?: string;
  items?: string[];
  images?: string[];
}

export interface IArticleShareLinks {
  icon: string;
  url: string;
}
export interface IArticle {
  id: number;
  img_url: string;
  title: string;
  read_min: string;
  date: string;
  description: string;
  bigdescription?: string;
  council: string;
  author?: string;
  role?: string;
  heroImage?: string;
  sections?: IArticleSection[];
  tableOfContents?: string[];
  shareLinks?: IArticleShareLinks[];
}

// Use only images that exist in public/ArticlePics: ArticleHero.png, ArticleBigImage.png, ArticleImage.png, ArticleComputer.png, computer.png
// const ARTICLE_HERO_IMG = "/ArticlePics/ArticleHero.png";
// const ARTICLE_BIG_IMG = "/ArticlePics/ArticleBigImage.png";

export const mockArticles: IArticle[] = [
  
];
