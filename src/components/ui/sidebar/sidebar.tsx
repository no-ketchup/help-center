import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    width?: string; // Default sidebar width
    collapsedWidth?: string; // Width when collapsed
    headerHeight?: string; // Header height to respect
    footerHeight?: string; // Footer height to respect
};

export const Sidebar = ({
                            children,
                            width = "16rem",
                            collapsedWidth = "4rem",
                            className,
                            ...props
                        }: SidebarProps) => {
    const { isCollapsed } = useSidebar(); // Get the collapsed state

    return (
        <div
            className={cn(
                "relative flex-shrink-0 transition-[width] duration-300 ease-in-out bg-sidebar text-sidebar-foreground",
                className
            )}
            style={{
                width: isCollapsed ? collapsedWidth : width,
            }}
            {...props}
        >
            {children}
        </div>
    );
};