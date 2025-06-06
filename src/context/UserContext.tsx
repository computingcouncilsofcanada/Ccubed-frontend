"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { publicAxios, privateAxios, setAxiosCsrfToken } from "@/lib/axios";

type User = {
  email: string;
  username: string;
  role: string;
  status: number;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  verify_token: string;
  id: string;
  school_id: string | null;
  year_of_study: number | null;
  department: string | null;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  verifySession: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  handleInitialLogin: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLogin, setIsInitialLogin] = useState(true);
  const [shouldVerifySession, setShouldVerifySession] = useState(false);
  const router = useRouter();
  // Handle hydration
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
      setIsInitialLogin(false);
      // Only verify session for saved users after a delay
      setTimeout(() => {
        setShouldVerifySession(true);
      }, 1000);
    }
  }, []);

  // Update sessionStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleInitialLogin = (newUser: User) => {
    setUserState(newUser);
    setIsInitialLogin(false);
    // Don't verify session immediately after login
    setShouldVerifySession(false);
  };

  const verifySession = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    if (!shouldVerifySession) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // First get a new CSRF token
      const csrfResponse = await publicAxios.get("/auth/csrf-token");
      if (csrfResponse.data) {
        // Set the CSRF token in the axios instance
        setAxiosCsrfToken(csrfResponse.data);
      }

      // Then verify the session
      const response = await privateAxios.post("/auth/refresh-token");

      if (response.data) {
        // Session is valid, keep the user
        return;
      }

      // No token in response, clear user
      setUserState(null);
    } catch (error: any) {
      console.error("Session verification failed:", error);
      // Only clear user on specific error types
      if (
        error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.response?.status === 400
      ) {
        alert("Sesstion expired please login again");
        setUserState(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await privateAxios.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Clear user state and session storage regardless of API response
      setUserState(null);
      localStorage.removeItem("user");
      setIsInitialLogin(true);
      setShouldVerifySession(false);
      router.push("/login");
    }
  };

  // Only verify session if we have a user and should verify
  useEffect(() => {
    if (user && shouldVerifySession) {
      verifySession();
    } else {
      setIsLoading(false);
    }
  }, [user, shouldVerifySession]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserState,
        verifySession,
        logout,
        isLoading,
        handleInitialLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
