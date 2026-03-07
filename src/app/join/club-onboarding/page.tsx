"use client";

import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import SignupForm from "./components/SignupForm";
import Footer from "@/components/shared/Footer";

export default function JoinPage() {
    const formSlug = "club-onboarding";

    return (
        <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-20">
            <BgBoxMainPage maxHeight={200} enableGlow={false} />

            {/* Background text watermark */}
            <div className="absolute inset-0 pointer-events-none" style={{ width: "100%", zIndex: 1 }}>
                <span
                    className="text-white select-none"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "300px",
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 900,
                        opacity: 0.03,
                        letterSpacing: "0em",
                        whiteSpace: "nowrap",
                    }}
                >
                    Join
                </span>
            </div>

            {/* Page content */}
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 xl:px-2 relative z-10 py-12 sm:py-20">
                <SignupForm formSlug={formSlug} />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
