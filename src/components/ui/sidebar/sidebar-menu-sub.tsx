import React from "react";
import { cn } from "@/lib/utils";

export const SidebarMenuSub = ({
                                   children,
                                   className,
                                   ...props
                               }: React.HTMLAttributes<HTMLUListElement>) => {
    return (
        <ul
            className={cn(
                "ml-4 flex flex-col gap-1 border-l pl-2",
                className
            )}
            {...props}
        >
            {children}
        </ul>
    );
};
SidebarMenuSub.displayName = "SidebarMenuSub";