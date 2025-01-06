import React from "react";
import { cn } from "@/lib/utils";

type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>;

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex-1 overflow-auto p-2", // Ensures content scrolls if needed
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

SidebarContent.displayName = "SidebarContent";