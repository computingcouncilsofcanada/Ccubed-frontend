import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Articles = () => {
  const router = useRouter();
  return (
    <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 xl:px-2 w-full max-w-[1152px] mt-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-4 cursor-pointer"
      >
        {Array.from({ length: 12 }, (_v, index) => (
          <div
            className=" flex flex-col gap-4 mb-4"
            key={index}
            onClick={() => router.push(`/article/${index + 1}`)}
          >
            <div className="h-40 rounded-xl overflow-hidden relative">
              <Image
                src="/ArticlePics/computer.png"
                alt="computer"
                fill
                objectFit="cover"
              ></Image>
            </div>
            <div className="text-white flex flex-col gap-3">
              <p className="px-2 py-1 bg-[#D4D4D4]/10 rounded-2xl w-fit ">
                Information Security
              </p>
              <div className="flex items-center gap-3">
                <p>7 mins read</p>
                <div className="flex gap-2 items-center">
                  <img src="/ArticlePics/note.svg" alt="" />
                  <p>Nov 21, 2025</p>
                </div>
              </div>
              <p>Top Cyber Threats Every User Should Watch Out For</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
