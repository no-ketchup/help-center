import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type SidebarMenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
};

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
    ({ asChild, className, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                ref={ref}
                className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md text-sm transition hover:bg-muted",
                    className
                )}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton };