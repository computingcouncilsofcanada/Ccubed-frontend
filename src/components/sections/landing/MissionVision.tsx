"use client";

import Image from "next/image";

export default function MissionVision() {
  return (
    <section className="mission-vision py-16 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-left mb-4">
        <h2 
          className="text-white text-[40px] leading-[48px] mb-4 font-extrabold"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "0%"
          }}
        >
          Connecting Students, Building Community
        </h2>
        <p 
          className="text-white max-w-3xl text-base font-light"
          style={{
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "1%"
          }}
        >
          We bring Canadian computing students together through engaging events and shared resources. Our goal is to create a supportive space where students feel connected, empowered, and never alone on their journey.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 justify-items-center">
        {/* Our Mission Card */}
        <div className="mission-card relative group cursor-pointer" style={{ width: '566px', height: '431px' }}>
          {/* Hover Rectangle */}
          <div 
            className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              width: '566px',
              height: '335px',
              background: "linear-gradient(to right, rgba(212, 212, 212, 0.05) 0%, transparent 100%)",
              borderRadius: "12px"
            }}
          >
            {/* Gradient border overlay - right to left */}
            <div 
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: 'linear-gradient(to left, #CF8419 0%, rgba(207, 132, 25, 0.4) 25%, rgba(207, 132, 25, 0.1) 50%, transparent 60%)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '3px'
              }}
            />
          </div>
          
          {/* Bear Image - Positioned at top of card */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-15">
            <Image
              src="/FigmaFiles/mainPageAssets/bear_speaker.svg"
              alt="Bear with Speaker"
              width={165}
              height={165}
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          
          {/* Card Content */}
          <div className="flex flex-col items-center px-4 pt-[59px] relative z-10">
            {/* Badge and Title Container */}
            <div className="flex flex-col items-center mb-8">
              {/* Badge Icon */}
              <div className="">
                <Image
                  src="/FigmaFiles/mainPageAssets/orange_badge.svg"
                  alt="Orange Badge"
                  width={127}
                  height={113}
                />
              </div>
              
              {/* Mission Title */}
              <div 
                className="flex items-center justify-center text-white font-semibold text-xl rounded-lg mt-[-16px] relative overflow-hidden backdrop-blur-sm"
                style={{
                  width: '233px',
                  height: '64px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "32px",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)"
                }}
              >
                {/* Gradient border overlay */}
                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 120% 80% at 20% 100%, rgba(212,212,212,0.4) 0%, rgba(212,212,212,0.25) 30%, rgba(212,212,212,0.1) 60%, transparent 100%)
                    `,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '1px'
                  }}
                />

                {/* Background grid - visible by default */}
                <div 
                  className="absolute inset-0 opacity-100 transition-opacity duration-600"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '7.28px 4px',
                    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
                    borderRadius: "8px"
                  }}
                />
                <span className="relative z-10">Our Mission</span>
              </div>
            </div>
            
            {/* Mission Description */}
            <div className="text-center max-w-lg">
              <p 
                className="text-white font-light text-lg leading-[21px] tracking-[0.01em] max-w-[460px]"
                style={{
                  fontFamily: "Roboto, sans-serif"
                }}
              >
                To connect and support students through engaging events while building community amongst Canadian computing student groups.
              </p>
            </div>
          </div>
        </div>

        {/* Our Vision Card */}
        <div className="vision-card relative group cursor-pointer" style={{ width: '566px', height: '431px' }}>
          {/* Hover Rectangle */}
          <div 
            className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              width: '566px',
              height: '335px',
              background: "linear-gradient(to left, rgba(212, 212, 212, 0.05) 0%, transparent 100%)",
              borderRadius: "12px"
            }}
          >
            {/* Gradient border overlay - left to right */}
            <div 
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: 'linear-gradient(to right, #FFF 0%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '3px'
              }}
            />
          </div>
          
          {/* Bear Image - Positioned at top of card */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-15">
            <Image
              src="/FigmaFiles/mainPageAssets/bear_earth.svg"
              alt="Bear with Earth"
              width={165}
              height={165}
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          
          {/* Card Content */}
          <div className="flex flex-col items-center px-4 pt-[59px] relative z-10">
            {/* Badge and Title Container */}
            <div className="flex flex-col items-center mb-8">
              {/* Badge Icon */}
              <div className="">
                <Image
                  src="/FigmaFiles/mainPageAssets/green_badge.svg"
                  alt="Green Badge"
                  width={127}
                  height={113}
                />
              </div>
              
              {/* Vision Title */}
              <div 
                className="flex items-center justify-center text-white font-semibold text-xl rounded-lg mt-[-16px] relative overflow-hidden backdrop-blur-sm"
                style={{
                  width: '233px',
                  height: '64px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "32px",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)"
                }}
              >
                {/* Gradient border overlay */}
                <div 
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse 120% 80% at 20% 100%, rgba(212,212,212,0.4) 0%, rgba(212,212,212,0.25) 30%, rgba(212,212,212,0.1) 60%, transparent 100%)
                    `,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '1px'
                  }}
                />

                {/* Background grid - visible by default */}
                <div 
                  className="absolute inset-0 opacity-100 transition-opacity duration-600"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '7.28px 4px',
                    maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 70%)',
                    borderRadius: "8px"
                  }}
                />
                <span className="relative z-10">Our Vision</span>
              </div>
            </div>
            
            {/* Vision Description */}
            <div className="text-center max-w-lg">
              <p 
                className="text-white font-light text-lg leading-[21px] tracking-[0.01em] max-w-[460px]"
                style={{
                  fontFamily: "Roboto, sans-serif"
                }}
              >
                To create a welcoming space where students can share their experiences and computing student groups can share their resources and knowledge to contribute to the success of the community as a whole. We envision a future where networking is simpler, advice is easy to come by, and computing students don&apos;t have to feel alone in an increasingly virtual industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 