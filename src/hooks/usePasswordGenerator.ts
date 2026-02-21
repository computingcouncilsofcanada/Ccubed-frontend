"use client";

import { useState, useCallback } from "react";

export interface PasswordOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSpecialChars?: boolean;
}

export const usePasswordGenerator = () => {
  const [password, setPassword] = useState<string>("");

  const generatePassword = useCallback((options: PasswordOptions = {}) => {
    const {
      length = 12,
      includeUppercase = true,
      includeLowercase = true,
      includeNumbers = true,
      includeSpecialChars = true,
    } = options;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "@$!%*?&";

    // Build enabled categories based on flags
    const enabledSets: string[] = [];
    if (includeUppercase) enabledSets.push(uppercaseChars);
    if (includeLowercase) enabledSets.push(lowercaseChars);
    if (includeNumbers) enabledSets.push(numberChars);
    if (includeSpecialChars) enabledSets.push(specialChars);

    // Fallback: ensure at least one set is enabled
    if (enabledSets.length === 0) {
      enabledSets.push(lowercaseChars);
    }

    // Ensure we can fit at least one char from each enabled set
    const finalLength = Math.max(length, enabledSets.length);

    // Add one guaranteed char from each enabled set
    let generated = enabledSets
      .map((set) => set[Math.floor(Math.random() * set.length)])
      .join("");

    // Create a full pool from enabled sets
    const pool = enabledSets.join("");

    // Fill the rest
    for (let i = generated.length; i < finalLength; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      generated += pool[idx];
    }

    // Shuffle for randomness
    const shuffled = generated
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(shuffled);
    return shuffled;
  }, []);

  return { password, generatePassword };
};
