import React from "react";
import BackgroundBoxes from "@/components/essentials/BackgroundBoxes";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";


const sociallinks = [{
  id: 1, 
  iconUrl: "/FigmaFiles/social-icons/brand-discord.svg",
  linkUrl: "https://discord.com/invite/477KvYukHf",
  altText: "Discord"
},
{
  id: 2, 
  iconUrl: "/FigmaFiles/social-icons/brand-linkedin.svg",
  linkUrl: "https://www.linkedin.com/company/ccubed-dev/posts/?feedView=all",
  altText: "LinkedIn"
},
{
  id: 3, 
  iconUrl: "/FigmaFiles/social-icons/brand-instagram.svg",
  linkUrl: "https://www.instagram.com/ccubed_dev/?hl=en",
  altText: "Instagram"
},
{
  id: 4, 
  iconUrl: "/FigmaFiles/social-icons/brand-facebook.svg",
  linkUrl: "https://www.facebook.com/ccubed.dev/",
  altText: "Facebook"
},
{
  id: 5, 
  iconUrl: "/FigmaFiles/social-icons/brand-twitter.svg",
  linkUrl: "https://x.com/ccubed_dev",
  altText: "Twitter"
},
]
const ComingSoon = () => {
  return (
    <>
      <BackgroundBoxes />
      <div className="bg-linear-to-r  from-[#0B161E] to-[#306184] h-screen ">
        <div className="px-10 flex flex-col  min-h-screen w-full max-w-7xl mx-auto">
          <Link href="/coming-soon" className="flex items-center py-4">
            <img src="/FigmaFiles/ccubed-icon.svg" alt="CCubed Icon" />
            <h1 className="text-white font-bold">CCUBED</h1>
          </Link>
          <div className=" bg-[#D4D4D4]/10 backdrop-blur-md drop-shadow-lg w-full mx-auto max-w-6xl rounded-4xl shadow-2xl flex flex-1 flex-col items-center justify-center gap-6 p-10 relative">
          <div className="absolute inset-0 rounded-4xl pointer-events-none " style={{
            background: "linear-gradient(to bottom right, #535C91, white 50%, #9290C3)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)" ,
            WebkitMaskComposite: "xor",
            padding: "0.3px"
          }}/>

        
            <img
              src="/FigmaFiles/ccubed-icon.svg"
              alt="CCubed Icon"
              width={150}
              height={150}
            />
            <p className="text-8xl font-bold text-white">Coming Soon</p>
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
                maxWidth: "800px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              enim animi doloremque distinctio optio officiis ipsam debitis
              cumque dolorum odio maxime placeat laborum, aspernatur consectetur
              neque sint est. Nemo, cum?
            </p>
            <div className="social-icons  flex  items-center gap-4">
              {sociallinks.map(({id, linkUrl, iconUrl, altText})=> (
                 <a
                 href={linkUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 key={id}
               >
                 <img
                   src={iconUrl}
                   alt={altText}
                 />
               </a>
              ))}
            </div>
            <div className="relative w-full mx-auto max-w-sm">
            <img
              src="/FigmaFiles/LoginFormAssets/mail-inactive.svg"
                 
              
              alt=""
              className="absolute left-5 top-1/2  -translate-y-1/2 "
            />
            <input
              
              type="email"
              placeholder="Email Address"
              className="font-normal bg-white py-4 rounded-full pl-12 pr-12 placeholder-gray-400"
          
            />
            
          </div>
          <button className="w-fit  bg-[#FAA336] px-10 py-3 rounded-full text-white">Notify me</button>
          </div>
          {/* dummy div */}
          <div className="footer  flex md:flex-row flex-col justify-between py-4 items-center">
  
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
