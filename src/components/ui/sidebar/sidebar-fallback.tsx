"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SidebarFallback({
                                    isCollapsed,
                                    categoryCollapseState,
                                }: {
    isCollapsed: boolean;
    categoryCollapseState: Record<string, boolean>;
}) {
    if (isCollapsed) {
        return (
            <div className="flex flex-col space-y-2 items-center">
                {/* Fake search icon */}
                <Skeleton className="h-8 w-8 rounded-md" />
                {/* Fake nav icons */}
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-md" />
                ))}
            </div>
        );
    }

    // Expanded = full nav
    return (
        <div className="flex flex-col space-y-3">
            {/* Fake search input */}
            <Skeleton className="h-8 w-full rounded-md" />

            <div className="space-y-2">
                {Object.entries(categoryCollapseState).map(([title, collapsed]) => (
                    <div key={title} className="space-y-1">
                        {/* Top-level nav button */}
                        <Skeleton className="h-8 w-full rounded-md" />

                        {/* Sub-items if expanded */}
                        {!collapsed && (
                            <div className="pl-4 space-y-1">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-6 w-3/4 rounded-md" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}