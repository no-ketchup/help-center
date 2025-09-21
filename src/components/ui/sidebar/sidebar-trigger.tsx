"use client";

import React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

type SidebarTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarTrigger = ({ className, ...props }: SidebarTriggerProps) => {
    const isCollapsed = useUIStore((s) => s.isSidebarCollapsed);
    const setCollapsed = useUIStore((s) => s.setSidebarCollapsed);

    return (
        <button
            onClick={() => setCollapsed(!isCollapsed)}
            className={cn("p-2 rounded-md hover:bg-muted", className)}
            aria-label="Toggle Sidebar"
            {...props}
        >
            <PanelLeft className="w-5 h-5" />
        </button>
    );
};