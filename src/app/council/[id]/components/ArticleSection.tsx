import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { InformationCard } from "./articlecomponents/InformationCard";
import { ArticleHeader } from "./articlecomponents/ArticleHeader";
import { ArticleBody } from "./articlecomponents/ArticleBody";
import { CouncilSection } from "../../types/types";

type CouncilProps = {
  council: CouncilSection;
};

export const ArticleSection = ({ council }: CouncilProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-32"
    >
      <ArticleHeader council={council} />
      <ArticleBody />
    </motion.div>
  );
};
