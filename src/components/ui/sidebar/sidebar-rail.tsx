"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

type SidebarRailProps = React.HTMLAttributes<HTMLDivElement>;

export const SidebarRail = React.forwardRef<HTMLDivElement, SidebarRailProps>(
    ({ className, ...props }, ref) => {
        const isCollapsed = useUIStore((s) => s.isSidebarCollapsed);
        const setCollapsed = useUIStore((s) => s.setSidebarCollapsed);

        const toggleSidebar = () => setCollapsed(!isCollapsed);

        return (
            <div
                ref={ref}
                role="separator"
                aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                onClick={toggleSidebar}
                className={cn(
                    "absolute inset-y-0 right-0 z-10 w-4 transition-colors ease-linear",
                    isCollapsed ? "cursor-e-resize" : "cursor-w-resize",
                    "flex items-center justify-center group",
                    className
                )}
                {...props}
            >
                {/* Visible 1px line */}
                <div className="w-[0.031rem] h-full bg-gray-400 group-hover:bg-gray-300" />
            </div>
        );
    }
);

SidebarRail.displayName = "SidebarRail";