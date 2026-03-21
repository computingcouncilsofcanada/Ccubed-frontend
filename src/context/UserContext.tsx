"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { publicAxios, privateAxios, setAxiosCsrfToken, setOnSessionExpired } from "@/lib/axios";
import type { AxiosError } from "axios";
import { Permission } from "@/components/sidebar/types";

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
  isHydrated: boolean;
  permissions: Permission[];
  handleSetPermissions: (newPermissions: Permission[]) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldVerifySession, setShouldVerifySession] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const router = useRouter();

  // Handle client-side hydration
  useEffect(() => {
    setIsHydrated(true);
    const savedUser = localStorage.getItem("user");
    const savedPermissions = localStorage.getItem("permissions");
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
      if (savedPermissions) {
        setPermissions(JSON.parse(savedPermissions) as Permission[]);
      }
      // Only verify session for saved users after a short delay
      const id = window.setTimeout(() => {
        setShouldVerifySession(true);
      }, 1000);
      return () => window.clearTimeout(id);
    } else {
      // If no saved user, we're done loading
      setIsLoading(false);
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleSetPermissions = (newPermissions: Permission[]) => {
    setPermissions(newPermissions);

    localStorage.setItem("permissions", JSON.stringify(newPermissions));
  };
  

  const handleInitialLogin = (newUser: User) => {
    setUser(newUser);
    // Don't verify session immediately after login
    setShouldVerifySession(false);
  };

  const verifySession = useCallback(async () => {
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
        return;
      }


      // No token in response, clear user
      setUser(null);
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error("Session verification failed:", error);
      // Only clear user on specific error types
      const status = error.response?.status;
      if (status === 401 || status === 403 || status === 400) {
        alert("Session expired please login again");
        setUser(null);
        localStorage.removeItem("user");
        setShouldVerifySession(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, shouldVerifySession]);

  const clearSessionAndRedirect = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    setShouldVerifySession(false);
    router.push("/login");
  }, [router]);

  const logout = async () => {
    try {
      await privateAxios.post("/auth/logout");
    } catch (err: unknown) {
      console.error("Logout failed:", err);
    } finally {
      clearSessionAndRedirect();
    }
  };

  // Register callback for axios interceptor when token refresh fails (session expired)
  useEffect(() => {
    setOnSessionExpired(logout);
    return () => setOnSessionExpired(null);
  }, [logout]);

  // Only verify session if we have a user and should verify
  useEffect(() => {
    if (user && shouldVerifySession) {
      verifySession();
    } else if (!user) {
      setIsLoading(false);
    }
  }, [user, shouldVerifySession, verifySession]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUser,
        verifySession,
        logout,
        isLoading,
        handleInitialLogin,
        isHydrated,
        permissions,
        handleSetPermissions,
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
