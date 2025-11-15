import { motion} from "framer-motion";
import { councilSections } from "@/data/councilSections";
import BackgroundTitle from "../BackgroundTitle";
import { CouncilCard } from "./CouncilCard";

export const CouncilSections = () => {
  return (
    <motion.div className="space-y-6 mb-32 flex flex-col items-center w-full max-w-[1152px] mx-auto">
      {councilSections.map((section, index) => (
        <div key={index} className="relative w-full ">
          <div className="hidden md:block">
            <BackgroundTitle title={section.title} />
          </div>

          {/* Card */}
          <CouncilCard section={section} index={index} />
        </div>
      ))}
    </motion.div>
  );
};
