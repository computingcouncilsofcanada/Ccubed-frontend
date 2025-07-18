import React from "react";
import BackgroundBoxes from "@/components/essentials/BackgroundBoxes";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <BackgroundBoxes />
      <div className="bg-linear-to-r  from-[#0B161E] to-[#306184] h-screen ">
        <div className="px-10 flex flex-col  min-h-screen w-full max-w-7xl mx-auto">
          <Link  href="/" className="flex items-center py-4">
            <img src="/FigmaFiles/ccubed-icon.svg" alt="CCubed Icon" />
            <h1 className="text-white font-bold">CCUBED</h1>
          </Link>
          <div className="flex-1 h-full flex">
            <div className=" bg-gray-200/10 backdrop-blur-sm w-1/2 rounded-4xl shadow-2xl flex flex-col items-center justify-center gap-4 px-10">
              <img
                src="/FigmaFiles/ccubed-icon.svg"
                alt="CCubed Icon"
                width={100}
                height={100}
              />
              <h1 className="text-white font-bold text-4xl">CCUBED</h1>
              <p className="text-white text-center text-lg font-thin">
                To connect and support students through engaging events while
                building community amongst Canadian computing student groups. 
              </p>
            </div>
            <LoginForm />
          </div>
          <div className="footer  flex justify-between py-4 items-center">
            <h1 className="text-white font-bold">
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
