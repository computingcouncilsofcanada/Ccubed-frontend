import { motion } from "framer-motion";

export const GlowingEffect = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 100% 100% at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 80%)",
        filter: "blur(30px)",
        transform: "scale(1.6)",
      }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
