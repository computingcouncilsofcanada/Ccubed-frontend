import Image from "next/image";

export const ArticleBigcard = () => {
  return (
    <div className="cope:w-1/2  relative flex flex-col gap-4">
      <div className="relative w-full h-70 rounded-4xl overflow-hidden">
        <Image
          src={"/ArticlePics/ArticleImage.png"}
          alt="Article Image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col  md:gap-0 gap-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center items-start md:gap-0 leading-[48px] tracking-[0.01em] text-white">
          <div className="flex gap-4">
            <p>Information Security</p>
            <p>7 min read</p>
          </div>
          <p>July 20, 2025</p>
        </div>
        <p className=" tracking-[0.01em] text-white font-extrabold text-2xl">
          The State of Cybersecurity in 2025: What You Need to Know
        </p>
      </div>
    </div>
  );
};
