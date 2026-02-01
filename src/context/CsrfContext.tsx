"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { setAxiosCsrfToken } from "@/lib/axios";

interface CsrfContextType {
  csrfTokenState: string;
  setCsrfToken: (token: string) => void;
}

const CsrfContext = createContext<CsrfContextType | undefined>(undefined);

export function CsrfProvider({ children }: { children: ReactNode }) {
  const [csrfTokenState, setCsrfTokenState] = useState<string>("");

  const setCsrfToken = (token: string) => {
    setCsrfTokenState(token);
    setAxiosCsrfToken(token);
  };

  return (
    <CsrfContext.Provider value={{ csrfTokenState, setCsrfToken }}>
      {children}
    </CsrfContext.Provider>
  );
}

export function useCsrf() {
  const context = useContext(CsrfContext);
  if (context === undefined) {
    throw new Error("useCsrf must be used within a CsrfProvider");
  }
  return context;
}
