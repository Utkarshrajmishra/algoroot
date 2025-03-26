"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface SidebarContextType {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isMobileMenuOpen: false,
  toggleMobileMenu:()=>{}
});

// Provider component
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  
  return (
    <SidebarContext.Provider
      value={{
        isMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
