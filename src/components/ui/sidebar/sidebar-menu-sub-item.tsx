import React from "react";
import { cn } from "@/lib/utils";

export const SidebarMenuSubItem = ({
                                       children,
                                       className,
                                       ...props
                                   }: React.LiHTMLAttributes<HTMLLIElement>) => {
    return (
        <li
            className={cn("group/sub-item relative", className)}
            {...props}
        >
            {children}
        </li>
    );
};
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";