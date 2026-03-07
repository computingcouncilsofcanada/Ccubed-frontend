"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface SuccessMessageProps {
    onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
    return (
        <motion.div
            className="w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-12 shadow-2xl text-center">
                {/* Animated checkmark circle */}
                <motion.div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(250, 163, 54, 0.15) 100%)",
                        border: "2px solid rgba(34, 197, 94, 0.4)",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <motion.svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <motion.path
                            d="M5 13L9 17L19 7"
                            stroke="#22C55E"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                        />
                    </motion.svg>
                </motion.div>

                <motion.h2
                    className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Application Submitted!
                </motion.h2>

                <motion.p
                    className="text-white/50 text-sm sm:text-base max-w-md mx-auto mb-8"
                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                >
                    Thank you for your interest in joining CCubed! We&apos;ve received
                    your application and our team will review it shortly. You&apos;ll hear
                    back from us via email.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <button
                        id="submit-another-btn"
                        onClick={onReset}
                        className="group relative px-6 py-3 rounded-lg font-semibold text-[#0E1E29] transition-all duration-300 overflow-hidden"
                        style={{ background: "#FAA336" }}
                    >
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Submit Another Response</span>
                    </button>

                    <Link
                        href="/"
                        id="back-home-link"
                        className="px-6 py-3 rounded-lg font-semibold text-white border border-white/20 hover:bg-white/5 transition-all duration-300"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}
