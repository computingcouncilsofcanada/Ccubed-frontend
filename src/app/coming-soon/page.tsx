import React from "react";
import BackgroundBoxes from "@/components/essentials/BackgroundBoxes";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <>
      <BackgroundBoxes />
      <div className="bg-linear-to-r  from-[#0B161E] to-[#306184] h-screen ">
        <div className="px-10 flex flex-col  min-h-screen w-full max-w-7xl mx-auto">
          <Link  href="/coming-soon" className="flex items-center py-4">
            <img src="/FigmaFiles/ccubed-icon.svg" alt="CCubed Icon" />
            <h1 className="text-white font-bold">CCUBED</h1>
          </Link>
          <div className="flex-1 h-full flex md:flex-row flex-col">
            <div className=" bg-gray-200/10 backdrop-blur-sm md:w-1/2 rounded-4xl shadow-2xl flex flex-col items-center justify-center gap-4 p-10">
              <img
                src="/FigmaFiles/comingSoonAssets/Ccubed-Logo.png"
                alt="CCubed Icon"
                width={400}
                height={400}
              />
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
           <div className=" flex-1 px-4 flex items-center justify-center">
<h1 className="text-white text-5xl font-bold text-center">Coming Soon !!</h1>
           </div>
          </div>
          <div className="footer  flex md:flex-row flex-col justify-between py-4 items-center">
            <h1 
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: "600",
                fontSize: "20px",
                letterSpacing: "0%",
                color: "#FFFFFF",
                opacity: "40%",
                textAlign: "center",
              }}
            >
              COMPUTING COUNCILS OF CANADA
            </h1>
            <div className="social-icons  flex  items-center gap-4">
        
              <a href="https://discord.com/invite/477KvYukHf" target="_blank" rel="noopener noreferrer">
                <img src="/FigmaFiles/social-icons/brand-discord.svg" alt="Discord" />
              </a>
              <a href="https://www.linkedin.com/company/ccubed-dev/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <img src="/FigmaFiles/social-icons/brand-linkedin.svg" alt="LinkedIn" />
              </a>
              <a href="https://www.instagram.com/ccubed_dev/?hl=en" target="_blank" rel="noopener noreferrer">
                <img src="/FigmaFiles/social-icons/brand-instagram.svg" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/ccubed.dev/" target="_blank" rel="noopener noreferrer">
                <img src="/FigmaFiles/social-icons/brand-facebook.svg" alt="Facebook" />
              </a>
              <a href="https://x.com/ccubed_dev" target="_blank" rel="noopener noreferrer">
                <img src="/FigmaFiles/social-icons/brand-twitter.svg" alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
