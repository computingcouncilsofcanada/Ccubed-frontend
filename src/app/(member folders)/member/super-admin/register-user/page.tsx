/**
 * User Registration Page
 *
 * This page provides a comprehensive interface for super admins to register new users in the system.
 * It includes functionality for creating user accounts with various roles and affiliations.
 * Access is restricted to super admin users only.
 *
 * Key Features:
 * - User registration form with validation
 * - School and department selection
 * - Password generation and copying
 * - Role assignment
 * - Form validation
 * - Role-based access control
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { RegisterUserForm } from "@/components/forms/RegisterUser";

/**
 * RegisterUser Component
 * Main component for user registration
 */
const RegisterUser = () => {
  // State management for user context and authentication
  const { user, isLoading } = useUser();
  const router = useRouter();


  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <RegisterUserForm />
    </div>
  );
};

export default RegisterUser;
