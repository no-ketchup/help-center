"use client";

import React, { createContext, useContext } from "react";
import { usePersistentSidebar } from "@/hooks/usePersistentSidebar";

type SidebarContextType = {
    isCollapsed: boolean;
    toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
                                    children,
                                    defaultState = false,
                                    onToggle,
                                }: {
    children: React.ReactNode;
    defaultState?: boolean; // Default state for collapsed/expanded
    onToggle?: (isCollapsed: boolean) => void; // Callback when toggling the sidebar
}) => {
    const { isCollapsed, toggleSidebar } = usePersistentSidebar(defaultState);

    const handleToggle = () => {
        toggleSidebar();
        onToggle?.(!isCollapsed); // Invoke callback with the new state
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleSidebar: handleToggle }}>
            {children}
        </SidebarContext.Provider>
    );
};