"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyUserRoute } from "@/services/useApiAuth";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams?.get("email");
      const token = searchParams?.get("token");

      if (!email || !token) {
        setVerificationStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const response = await verifyUserRoute(email, token);
        setVerificationStatus("success");
        setMessage(response.message || "Email verified successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error: any) {
        setVerificationStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed. Please try again."
        );
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 rounded-lg shadow-lg">
        {/* Loading State */}
        {verificationStatus === "loading" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
            <p>Please wait while we verify your email address.</p>
          </div>
        )}

        {/* Success State */}
        {verificationStatus === "success" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-600">
              Verification Successful!
            </h1>
            <p>{message}</p>
            <p className="mt-4">Redirecting to login page...</p>
          </div>
        )}

        {/* Error State */}
        {verificationStatus === "error" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-red-600">
              Verification Failed
            </h1>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
