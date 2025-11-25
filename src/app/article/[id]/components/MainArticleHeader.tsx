import Image from "next/image";

export const MainArticleHeader = () => {
  return (
    <>
      <h1 className="text-6xl font-bold max-w-[900px] mt-10">
        The State of Cybersecurity in 2025: What You Need to Know
      </h1>
      <div className="flex gap-3 items-center w-fit my-8">
        <div className="size-10 relative rounded-full overflow-hidden">
          <Image
            src="/ArticlePics/computer.png"
            alt="Image"
            fill
            objectFit="cover"
          ></Image>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-lg">Baia Malvina</p>
          <p>CyberSecurity Coordinator</p>
        </div>
      </div>
      <div className=" my-5 flex items-center gap-2 justify-end">
        <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit ">
          Information Security
        </p>
        <div className="w-4 h-[1px] bg-white rotate-90"></div>
        <div className="flex gap-2 items-center">
          <img src="/ArticlePics/note.svg" alt="" />
          <p>Nov 21, 2025</p>
        </div>
        <div className="w-4 h-[1px] bg-white rotate-90"></div>
        <p>7 mins read</p>
      </div>
    </>
  );
};
