import Image from "next/image";
import { InformationCard } from "./InformationCard";
import { ArticleBigcard } from "./ArticleBigCard";

export const ArticleBody = () => {
  return (
    <div className="flex flex-col cope:flex-row gap-7">
      <ArticleBigcard />
      <div className="cope:w-1/2 max-cope:items-center flex flex-col gap-5">
        <InformationCard />
        <InformationCard />
        <InformationCard />
      </div>
    </div>
  );
};
