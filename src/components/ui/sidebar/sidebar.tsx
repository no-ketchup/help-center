import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    width?: string;
    collapsedWidth?: string;
};

export const Sidebar = ({
                            children,
                            width = "16rem",
                            collapsedWidth = "4rem",
                            className,
                            ...props
                        }: SidebarProps) => {
    const isCollapsed = useUIStore((s) => s.isSidebarCollapsed);

    // Track hydration
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    // Pre-hydration fallback: match RootLayout preload class
    const collapsed = hydrated
        ? isCollapsed
        : document.documentElement.classList.contains("sidebar-collapsed");

    return (
        <div
            className={cn(
                "relative flex flex-col flex-shrink-0 transition-[width] duration-300 ease-in-out bg-sidebar text-sidebar-foreground",
                className
            )}
            style={{ width: collapsed ? collapsedWidth : width }}
            {...props}
        >
            {children}
        </div>
    );
};