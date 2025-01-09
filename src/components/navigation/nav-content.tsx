"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import cn from "classnames";

const CATEGORY_STATE_KEY = "sidebar-category-state";

export default function NavContent({
                                       items,
                                       isCollapsed,
                                   }: {
    items: {
        title: string;
        url?: string;
        icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
        items?: { title: string; url: string }[];
    }[];
    isCollapsed: boolean;
}) {
    // Persistent state for categories
    const [categoryState, setCategoryState] = useState<Record<string, boolean>>({});
    const [hasHydrated, setHasHydrated] = useState(false); // Avoid hydration mismatch

    // Initialize state from localStorage
    useEffect(() => {
        const storedState = localStorage.getItem(CATEGORY_STATE_KEY);
        if (storedState) {
            setCategoryState(JSON.parse(storedState));
        }
        setHasHydrated(true); // Mark hydration as complete
    }, []);

    // Save state to localStorage when it changes
    useEffect(() => {
        if (hasHydrated) {
            localStorage.setItem(CATEGORY_STATE_KEY, JSON.stringify(categoryState));
        }
    }, [categoryState, hasHydrated]);

    const toggleCategory = (title: string) => {
        setCategoryState((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    {isCollapsed ? (
                        // Render only the icons in collapsed state
                        <SidebarMenuButton asChild>
                            <a
                                href={item.url}
                                className="flex items-center justify-center p-2 rounded-md hover:bg-muted dark:hover:bg-muted/80"
                                title={item.title} // Add tooltip for better accessibility
                            >
                                {item.icon && (
                                    <item.icon
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="w-6 h-6"
                                    />
                                )}
                            </a>
                        </SidebarMenuButton>
                    ) : hasHydrated && item.items ? (
                        // Render collapsible menu in expanded state
                        <Collapsible
                            className="group/collapsible"
                            open={categoryState[item.title] || false}
                            onOpenChange={() => toggleCategory(item.title)}
                        >
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="flex items-center">
                                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                        {item.icon && (
                                            <item.icon
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                className="w-6 h-6" // Consistent size
                                            />
                                        )}
                                    </div>
                                    <span className="ml-2">{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a
                                                    href={subItem.url}
                                                    className="block p-2 text-sm rounded-lg hover:underline hover:decoration-1 hover:underline-offset-2 hover:decoration-muted hover:bg-muted dark:hover:bg-muted/80"
                                                >
                                                    {subItem.title}
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </Collapsible>
                    ) : (
                        // Static link in expanded state
                        <SidebarMenuButton asChild>
                            <a
                                href={item.url}
                                className={cn(
                                    "flex items-center p-2 rounded-md transition-all duration-200 hover:underline hover:decoration-2 hover:underline-offset-4 hover:bg-muted dark:hover:bg-muted/80",
                                    isCollapsed ? "justify-center" : "" // Center the icon in collapsed state
                                )}
                                title={isCollapsed ? item.title : undefined} // Tooltip for collapsed state
                            >
                                {item.icon && (
                                    <div
                                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                                    >
                                        <item.icon
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            className="w-6 h-6"
                                        />
                                    </div>
                                )}
                                {!isCollapsed && <span className="ml-2">{item.title}</span>} {/* Hide text in collapsed state */}
                            </a>
                        </SidebarMenuButton>
                    )}
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}