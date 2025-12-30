import Image from "next/image";
import { InformationCard } from "./InformationCard";
import { ArticleBigcard } from "./ArticleBigCard";

export const ArticleBody = () => {
  return (
    <div className="flex flex-col [@media(min-width:1054px)]:flex-row gap-7">
      <ArticleBigcard />
      <div className="[@media(min-width:1054px)]:w-1/2 max-[1054px]:items-center flex flex-col gap-5">
        <InformationCard />
        <InformationCard />
        <InformationCard />
      </div>
    </div>
  );
};
