import Image from "next/image";

function TeamCardSocials({ linkedin }: { linkedin: string }) {
  return (
    <div className="absolute top-3 right-4 h-fit px-2 py-2 flex flex-col  items-center gap-3  cursor-pointer group-hover:opacity-0">
      {linkedin && (
        <div className="w-8 h-8 p-2 rounded-full  bg-[#10212E]/50 shrink-0 flex items-center justify-center border-1 border-white">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <Image
              src="/linkedin.svg"
              alt="Linkedin Icon"
              width={24}
              height={24}
              className="mx-auto"
            />
          </a>
        </div>
      )}
    </div>
  );
}

export default TeamCardSocials;
