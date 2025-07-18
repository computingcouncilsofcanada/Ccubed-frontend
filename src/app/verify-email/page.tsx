/**
 * Email Verification Page Component
 *
 * This page handles the email verification process for new user registrations.
 * It processes verification tokens from URL parameters and displays appropriate
 * status messages to the user based on the verification result.
 */

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyUserRoute } from "@/services/useApiAuth";

/**
 * VerifyEmailPage Component
 *
 * This component:
 * 1. Extracts email and token from URL parameters
 * 2. Manages verification states (loading, success, error)
 * 3. Handles the verification process through API call
 * 4. Provides user feedback during the verification process
 * 5. Automatically redirects to login page after successful verification
 */
const VerifyEmailPage = () => {
  // Get URL search parameters and router for navigation
  const searchParams = useSearchParams();
  const router = useRouter();

  // State for tracking verification process
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("");

  // Effect hook to handle email verification on component mount
  useEffect(() => {
    const verifyEmail = async () => {
      // Extract email and token from URL parameters
      const email = searchParams?.get("email");
      const token = searchParams?.get("token");

      // Validate required parameters
      if (!email || !token) {
        setVerificationStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        // Attempt to verify the email through API
        const response = await verifyUserRoute(email, token);
        setVerificationStatus("success");
        setMessage(response.message || "Email verified successfully!");

        // Redirect to login page after successful verification
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error: any) {
        // Handle verification errors
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
