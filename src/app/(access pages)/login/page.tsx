"use client";

import React from "react";
import BackgroundBoxes from "@/components/essentials/BackgroundBoxes";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import { useSafariImageFallback } from "@/hooks/useSafariImageFallback";
import Image from "next/image";

const Login = () => {
  const logoSrc = useSafariImageFallback(
    "/FigmaFiles/ccubed-icon.svg",
    "/FigmaFiles/ccubed-icon.png"
  );

  return (
    <>
      <BackgroundBoxes />
      <div className="bg-linear-to-r  from-[#0D1C26] to-[#1A384C] h-screen ">
        <div className="px-10 flex flex-col  min-h-screen w-full max-w-7xl mx-auto">
          <Link  href="/" className="flex items-center py-4">
            <Image src={logoSrc}
              alt="CCubed Icon"
              width={40}
              height={40}
              quality={100}
              draggable={false}
              style={{ userSelect: "none" }}
            />
            <h1 className="text-white font-bold">CCUBED</h1>
          </Link>
          <div className="flex-1 h-full flex">
            <div className=" bg-gray-200/10 backdrop-blur-sm w-1/2 rounded-4xl shadow-2xl flex flex-col items-center justify-center gap-4 px-10">
              <Image
                src={logoSrc}
                alt="CCubed Icon"
                width={100}
                height={100}
                quality={100}
                draggable={false}
                style={{ userSelect: "none" }}
              />
              <h1 className="text-white font-bold text-4xl">CCUBED</h1>
                            <p 
                className="text-center max-sm:text-sm max-sm:leading-tight max-sm:px-2 mx-auto"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "300",
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  opacity: "100%",
                  maxWidth: "460px"
                }}
              >
                To connect and support students through engaging events while
                building community amongst Canadian computing student groups. 
              </p>
            </div>
            <LoginForm />
          </div>
          <div className="footer  flex justify-between py-4 items-center">
            <h1 
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: "600",
                fontSize: "20px",
                letterSpacing: "0%",
                color: "#FFFFFF",
                opacity: "40%"
              }}
            >
              COMPUTING COUNCILS OF CANADA
            </h1>
            <div className="social-icons  flex items-center gap-4">
              <img src="/FigmaFiles/social-icons/brand-discord.svg" alt="" />
              <img src="/FigmaFiles/social-icons/brand-linkedin.svg" alt="" />
              <img src="/FigmaFiles/social-icons/brand-instagram.svg" alt="" />
              <img src="/FigmaFiles/social-icons/brand-facebook.svg" alt="" />
              <img src="/FigmaFiles/social-icons/brand-twitter.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
