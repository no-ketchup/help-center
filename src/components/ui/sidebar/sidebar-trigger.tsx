"use client";

import React from "react";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";

type SidebarTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarTrigger = ({ className, ...props }: SidebarTriggerProps) => {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            onClick={toggleSidebar}
            className={cn("p-2 rounded-md hover:bg-muted", className)} // Combine default and passed class names
            aria-label="Toggle Sidebar"
            {...props} // Forward any additional props
        >
            <PanelLeft className="w-5 h-5" />
        </button>
    );
};