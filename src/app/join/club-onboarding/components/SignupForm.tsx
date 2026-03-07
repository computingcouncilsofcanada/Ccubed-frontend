"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { publicAxios } from "@/lib/axios";
import SuccessMessage from "./SuccessMessage";

// ------------------------------------------------------------------
// Zod schema — single source of truth for validation
// ------------------------------------------------------------------
const signupSchema = z.object({
    full_name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
    email: z
        .string()
        .email("Please enter a valid email address"),
    university: z
        .string()
        .min(2, "University name is required")
        .max(150, "University name is too long"),
    club_name: z
        .string()
        .min(2, "Club name is required")
        .max(150, "Club name is too long"),
    role_in_club: z
        .string()
        .min(1, "Please select your role"),
    year_of_study: z
        .string()
        .min(1, "Please select your year of study"),
    program_of_study: z
        .string()
        .min(2, "Program of study is required")
        .max(150, "Program of study is too long"),
    phone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^[+]?[\d\s()-]{7,20}$/.test(val),
            "Please enter a valid phone number"
        ),
    linkedin_url: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(val),
            "Please enter a valid LinkedIn URL"
        ),
    reason_to_join: z
        .string()
        .min(10, "Please write at least 10 characters")
        .max(1000, "Response must be less than 1000 characters"),
    how_did_you_hear: z
        .string()
        .min(1, "Please select an option"),
    // Honeypot field for spam protection (must stay empty)
    website: z.string().max(0, "Bot detected").optional(),
});

type SignupFormData = z.infer<typeof signupSchema>;

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------
const roleOptions = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Director",
    "Lead / Manager",
    "General Member",
    "Other",
];

const yearOptions = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "5th Year+",
    "Graduate Student",
    "Alumni",
];

const hearAboutOptions = [
    "Social Media",
    "University Event",
    "Friend / Word of Mouth",
    "CCubed Website",
    "Email Newsletter",
    "Other",
];

// ------------------------------------------------------------------
// Reusable animated input wrapper
// ------------------------------------------------------------------
const formItemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
    }),
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
interface SignupFormProps {
    formSlug: string;
}

export default function SignupForm({ formSlug }: SignupFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            full_name: "",
            email: "",
            university: "",
            club_name: "",
            role_in_club: "",
            year_of_study: "",
            program_of_study: "",
            phone: "",
            linkedin_url: "",
            reason_to_join: "",
            how_did_you_hear: "",
            website: "", // honeypot
        },
    });

    const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
        // Honeypot check
        if (data.website) return;

        setServerError("");
        try {
            await publicAxios.post("/form-submissions", {
                form_id: formSlug,
                ...data,
            });
            setSubmitted(true);
            reset();
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message || "Something went wrong. Please try again later.";
            setServerError(message);
        }
    };

    // ----------------------------------------------------------------
    // Success state
    // ----------------------------------------------------------------
    if (submitted) {
        return <SuccessMessage onReset={() => setSubmitted(false)} />;
    }

    // ----------------------------------------------------------------
    // Shared input class names (dark-themed, consistent with site)
    // ----------------------------------------------------------------
    const inputBase =
        "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all duration-200 focus:border-[#FAA336]/60 focus:ring-2 focus:ring-[#FAA336]/20 focus:bg-white/[0.07]";
    const labelBase = "block text-sm font-medium text-white/70 mb-1.5";
    const errorBase = "mt-1 text-xs text-red-400";
    const selectBase =
        "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none backdrop-blur-sm transition-all duration-200 focus:border-[#FAA336]/60 focus:ring-2 focus:ring-[#FAA336]/20 appearance-none cursor-pointer focus:bg-white/[0.07]";

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative w-full max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
            {/* Glassmorphic card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
                {/* ---- Header ---- */}
                <motion.div variants={formItemVariants} custom={0} className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Join CCubed
                    </h1>
                    <p
                        className="mt-2 text-white/50 text-sm sm:text-base"
                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
                    >
                        Fill out the form below to register your interest. We&apos;ll be in
                        touch soon!
                    </p>
                </motion.div>

                {/* ---- Server error ---- */}
                <AnimatePresence>
                    {serverError && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400 text-sm"
                        >
                            {serverError}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-5">
                    {/* ────── Row 1: Full Name & Email ────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div variants={formItemVariants} custom={1}>
                            <label htmlFor="signup-full-name" className={labelBase}>
                                Full Name <span className="text-[#FAA336]">*</span>
                            </label>
                            <input
                                id="signup-full-name"
                                type="text"
                                placeholder="e.g. Jane Doe"
                                className={`${inputBase} ${errors.full_name ? "border-red-500/60" : ""}`}
                                {...register("full_name")}
                            />
                            {errors.full_name && (
                                <p className={errorBase}>{errors.full_name.message}</p>
                            )}
                        </motion.div>

                        <motion.div variants={formItemVariants} custom={2}>
                            <label htmlFor="signup-email" className={labelBase}>
                                Email Address <span className="text-[#FAA336]">*</span>
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                placeholder="you@university.ca"
                                className={`${inputBase} ${errors.email ? "border-red-500/60" : ""}`}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className={errorBase}>{errors.email.message}</p>
                            )}
                        </motion.div>
                    </div>

                    {/* ────── Row 2: University & Club Name ────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div variants={formItemVariants} custom={3}>
                            <label htmlFor="signup-university" className={labelBase}>
                                University / College <span className="text-[#FAA336]">*</span>
                            </label>
                            <input
                                id="signup-university"
                                type="text"
                                placeholder="e.g. University of Toronto"
                                className={`${inputBase} ${errors.university ? "border-red-500/60" : ""}`}
                                {...register("university")}
                            />
                            {errors.university && (
                                <p className={errorBase}>{errors.university.message}</p>
                            )}
                        </motion.div>

                        <motion.div variants={formItemVariants} custom={4}>
                            <label htmlFor="signup-club-name" className={labelBase}>
                                Club / Organization Name <span className="text-[#FAA336]">*</span>
                            </label>
                            <input
                                id="signup-club-name"
                                type="text"
                                placeholder="e.g. UofT Computer Science Club"
                                className={`${inputBase} ${errors.club_name ? "border-red-500/60" : ""}`}
                                {...register("club_name")}
                            />
                            {errors.club_name && (
                                <p className={errorBase}>{errors.club_name.message}</p>
                            )}
                        </motion.div>
                    </div>

                    {/* ────── Row 3: Role & Year of Study ────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div variants={formItemVariants} custom={5}>
                            <label htmlFor="signup-role" className={labelBase}>
                                Your Role in the Club <span className="text-[#FAA336]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="signup-role"
                                    className={`${selectBase} ${errors.role_in_club ? "border-red-500/60" : ""}`}
                                    {...register("role_in_club")}
                                >
                                    <option value="" className="bg-[#162C3D] text-white/40">
                                        Select your role
                                    </option>
                                    {roleOptions.map((role) => (
                                        <option
                                            key={role}
                                            value={role}
                                            className="bg-[#162C3D] text-white"
                                        >
                                            {role}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom chevron */}
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            {errors.role_in_club && (
                                <p className={errorBase}>{errors.role_in_club.message}</p>
                            )}
                        </motion.div>

                        <motion.div variants={formItemVariants} custom={6}>
                            <label htmlFor="signup-year" className={labelBase}>
                                Year of Study <span className="text-[#FAA336]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="signup-year"
                                    className={`${selectBase} ${errors.year_of_study ? "border-red-500/60" : ""}`}
                                    {...register("year_of_study")}
                                >
                                    <option value="" className="bg-[#162C3D] text-white/40">
                                        Select year
                                    </option>
                                    {yearOptions.map((year) => (
                                        <option
                                            key={year}
                                            value={year}
                                            className="bg-[#162C3D] text-white"
                                        >
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            {errors.year_of_study && (
                                <p className={errorBase}>{errors.year_of_study.message}</p>
                            )}
                        </motion.div>
                    </div>

                    {/* ────── Row 4: Program of Study ────── */}
                    <motion.div variants={formItemVariants} custom={7}>
                        <label htmlFor="signup-program" className={labelBase}>
                            Program of Study <span className="text-[#FAA336]">*</span>
                        </label>
                        <input
                            id="signup-program"
                            type="text"
                            placeholder="e.g. Computer Science, Software Engineering"
                            className={`${inputBase} ${errors.program_of_study ? "border-red-500/60" : ""}`}
                            {...register("program_of_study")}
                        />
                        {errors.program_of_study && (
                            <p className={errorBase}>{errors.program_of_study.message}</p>
                        )}
                    </motion.div>

                    {/* ────── Row 5: Phone & LinkedIn (optional) ────── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div variants={formItemVariants} custom={8}>
                            <label htmlFor="signup-phone" className={labelBase}>
                                Phone Number{" "}
                                <span className="text-white/30 text-xs">(optional)</span>
                            </label>
                            <input
                                id="signup-phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className={`${inputBase} ${errors.phone ? "border-red-500/60" : ""}`}
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <p className={errorBase}>{errors.phone.message}</p>
                            )}
                        </motion.div>

                        <motion.div variants={formItemVariants} custom={9}>
                            <label htmlFor="signup-linkedin" className={labelBase}>
                                LinkedIn Profile{" "}
                                <span className="text-white/30 text-xs">(optional)</span>
                            </label>
                            <input
                                id="signup-linkedin"
                                type="url"
                                placeholder="https://linkedin.com/in/yourprofile"
                                className={`${inputBase} ${errors.linkedin_url ? "border-red-500/60" : ""}`}
                                {...register("linkedin_url")}
                            />
                            {errors.linkedin_url && (
                                <p className={errorBase}>{errors.linkedin_url.message}</p>
                            )}
                        </motion.div>
                    </div>

                    {/* ────── Row 6: How did you hear ────── */}
                    <motion.div variants={formItemVariants} custom={10}>
                        <label htmlFor="signup-hear" className={labelBase}>
                            How did you hear about CCubed?{" "}
                            <span className="text-[#FAA336]">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id="signup-hear"
                                className={`${selectBase} ${errors.how_did_you_hear ? "border-red-500/60" : ""}`}
                                {...register("how_did_you_hear")}
                            >
                                <option value="" className="bg-[#162C3D] text-white/40">
                                    Select an option
                                </option>
                                {hearAboutOptions.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                        className="bg-[#162C3D] text-white"
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        {errors.how_did_you_hear && (
                            <p className={errorBase}>{errors.how_did_you_hear.message}</p>
                        )}
                    </motion.div>

                    {/* ────── Row 7: Reason to Join (textarea) ────── */}
                    <motion.div variants={formItemVariants} custom={11}>
                        <label htmlFor="signup-reason" className={labelBase}>
                            Why do you want to join CCubed?{" "}
                            <span className="text-[#FAA336]">*</span>
                        </label>
                        <textarea
                            id="signup-reason"
                            rows={4}
                            placeholder="Tell us about your interest in CCubed and what you hope to gain..."
                            className={`${inputBase} resize-none ${errors.reason_to_join ? "border-red-500/60" : ""}`}
                            {...register("reason_to_join")}
                        />
                        {errors.reason_to_join && (
                            <p className={errorBase}>{errors.reason_to_join.message}</p>
                        )}
                    </motion.div>

                    {/* ────── Honeypot (invisible) ────── */}
                    <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                    </div>

                    {/* ────── Submit Button ────── */}
                    <motion.div variants={formItemVariants} custom={12} className="pt-2">
                        <button
                            id="signup-submit-btn"
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full sm:w-auto px-10 py-3.5 rounded-lg font-semibold text-[#0E1E29] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            style={{ background: "#FAA336" }}
                        >
                            {/* Hover gradient overlay */}
                            <span className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Submitting…
                                    </>
                                ) : (
                                    "Submit Application"
                                )}
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.form>
    );
}
