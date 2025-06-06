import { useState, useCallback } from "react";

interface PasswordOptions {
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

    // Ensure at least one character from each required type
    let generatedPassword = "";
    generatedPassword +=
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    generatedPassword +=
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    generatedPassword +=
      numberChars[Math.floor(Math.random() * numberChars.length)];
    generatedPassword +=
      specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password with random characters
    const allChars =
      uppercaseChars + lowercaseChars + numberChars + specialChars;
    for (let i = generatedPassword.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    // Shuffle the password
    generatedPassword = generatedPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(generatedPassword);
    return generatedPassword;
  }, []);

  return { password, generatePassword };
};
