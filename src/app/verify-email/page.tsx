"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyUserRoute } from "@/services/useApiAuth";

type Json = Record<string, unknown>;

function extractApiMessage(e: unknown): string | undefined {
  if (typeof e !== "object" || e === null) return undefined;

  const response = (e as Json).response;
  if (typeof response !== "object" || response === null) return undefined;

  const data = (response as Json).data;
  if (typeof data !== "object" || data === null) return undefined;

  const message = (data as Json).message;
  return typeof message === "string" ? message : undefined;
}

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timeoutId: number | undefined;

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
        timeoutId = window.setTimeout(() => {
          router.push("/welcome");
        }, 3000);
      } catch (err: unknown) {
        setVerificationStatus("error");
        const apiMsg = extractApiMessage(err);
        setMessage(apiMsg ?? "Verification failed. Please try again.");
      }
    };

    verifyEmail();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 rounded-lg shadow-lg">
        {verificationStatus === "loading" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
            <p>Please wait while we verify your email address.</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-600">
              Verification Successful!
            </h1>
            <p>{message}</p>
            <p className="mt-4">Redirecting to welcome page...</p>
          </div>
        )}

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
