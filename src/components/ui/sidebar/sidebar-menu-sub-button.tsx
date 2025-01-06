import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type SidebarMenuSubButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
};

const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
    ({ asChild, className, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "a";

        return (
            <Comp
                ref={ref}
                className={cn(
                    "block px-2 py-1 text-sm rounded-md hover:bg-muted transition",
                    className
                )}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export { SidebarMenuSubButton };