import Image from "next/image";

export const InformationCard = () => {
  return (
    <div className="max-md:h-40 flex gap-2">
      <div className="relative w-40  h-full md:h-30 rounded-3xl overflow-hidden">
        <Image
          src={"/ArticlePics/ArticleComputer.png"}
          alt="Article Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col  md:gap-0 gap-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center items-start md:gap-0  leading-[48px] tracking-[0.01em] text-white">
          <div className="flex gap-4">
            <p>Information Security</p>
            <p>5 min read</p>
          </div>
          <p>July 20, 2025</p>
        </div>
        <p className=" tracking-[0.01em] text-white  font-bold">
          Top Cyber Threats Every User Should Watch Out For
        </p>
      </div>
    </div>
  );
};
