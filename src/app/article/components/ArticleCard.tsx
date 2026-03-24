import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IArticle } from "@/data/mockArticles";

type ArticleCardProps = {
  article: IArticle;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const router = useRouter();
  return (
    <div
      className="relative flex flex-col gap-4 mb-4 rounded-xl p-2 cursor-pointer group transition-all duration-300"
      onClick={() => router.push(`/article/${article.id}`)}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/6"></div>

      <div className="h-40 rounded-xl overflow-hidden relative z-10">
        <Image
          src={article.img_url}
          alt={article.title}
          fill
          objectFit="cover"
        />
      </div>
      <div className="text-white flex flex-col gap-3 z-10">
        <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit">
          {article.tag}
        </p>
        <div className="flex items-center gap-3">
          <p>{article.read_min}</p>
          <div className="flex gap-2 items-center">
            <img src="/ArticlePics/note.svg" alt="" />
            <p>{article.date}</p>
          </div>
        </div>
        <p>{article.title}</p>
      </div>
    </div>
  );
}
