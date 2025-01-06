import React from "react";
import { cn } from "@/lib/utils";

export const SidebarMenu = ({
                                children,
                                className,
                                ...props
                            }: React.HTMLAttributes<HTMLUListElement>) => {
    return (
        <ul
            className={cn("flex flex-col gap-1", className)}
            {...props}
        >
            {children}
        </ul>
    );
};
SidebarMenu.displayName = "SidebarMenu";