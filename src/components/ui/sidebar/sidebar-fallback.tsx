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
            <div className="flex flex-col space-y-3 items-center">
                {/* Search icon button stub */}
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted/40 dark:bg-muted/30">
                    <Skeleton className="h-5 w-5 rounded-sm" />
                </div>

                {/* Nav icon stubs */}
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center h-10 w-10 rounded-md bg-muted/40 dark:bg-muted/30"
                    >
                        <Skeleton className="h-5 w-5 rounded-sm" />
                    </div>
                ))}
            </div>
        );
    }

    // Expanded = full nav
    return (
        <div className="flex flex-col space-y-5">
            {/* Fake search form: icon button + input bar */}
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-muted/40 dark:bg-muted/30">
                    <Skeleton className="h-5 w-5 rounded-sm" />
                </div>
                <div className="flex-1 h-10 rounded-md border-b border-dashed border-zinc-400 dark:border-zinc-300 animate-pulse" />
            </div>

            {/* Nav sections */}
            <div className="space-y-3">
                {Object.entries(categoryCollapseState).map(([title, collapsed]) => (
                    <div key={title} className="space-y-2">
                        {/* Top-level nav button */}
                        <Skeleton className="h-9 w-full rounded-md" />

                        {/* Sub-items if expanded */}
                        {!collapsed && (
                            <div className="pl-6 space-y-2">
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