import React from "react";
import { cn } from "@/lib/utils";

export const SidebarMenuItem = ({
                                    children,
                                    className,
                                    ...props
                                }: React.LiHTMLAttributes<HTMLLIElement>) => {
    return (
        <li
            className={cn("relative group/menu-item", className)}
            {...props}
        >
            {children}
        </li>
    );
};
SidebarMenuItem.displayName = "SidebarMenuItem";