"use client";

import {
    Sidebar,
    SidebarFallback,
    SidebarRail,
} from "../ui/sidebar";
import NavContent from "./nav-content";
import { useCategories } from "@/hooks/useCategories";
import React, { Suspense } from "react";
import { Collection, Question, Comment } from "../svgs";
import { SearchForm } from "@/components/navigation/search-form";
import { mapCategoriesToNavItems } from "@/components/navigation/nav-utils";
import { handleError } from "@/utils/handleError";
import { useUIStore } from "@/store/ui-store";

type NavItem = {
    title: string;
    url?: string;
    icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
    items?: { id: string; title: string; url: string; description?: string }[];
};

const navMainData: NavItem[] = [
    { title: "User Guides", icon: Collection, items: [] },
    { title: "FAQs", url: "/faq", icon: Question },
    { title: "Contact", url: "/contact", icon: Comment },
];

export function AppSidebar() {
    const { categories, loading, error } = useCategories();
    const isCollapsed = useUIStore((s) => s.isSidebarCollapsed);
    const categoryState = useUIStore((s) => s.categoryState);
    const toggleCategory = useUIStore((s) => s.toggleCategory);

    // Loading skeleton
    if (loading) {
        return (
            <Sidebar>
                <SidebarFallback
                    isCollapsed={isCollapsed}
                    categoryCollapseState={categoryState}
                />
                <SidebarRail />
            </Sidebar>
        );
    }

    // Error state
    if (error) {
        const resolvedError = handleError(error);
        return (
            <Sidebar>
                <div className="p-4 text-sm text-red-500">
                    Error loading categories: {resolvedError.message}
                </div>
                <SidebarRail />
            </Sidebar>
        );
    }

    const safeCategories = (categories || []).map((c) => ({
        ...c,
        key: `${c.slug}-${c.id}`,
    }));

    const navMain = navMainData.map((item) =>
        item.title === "User Guides"
            ? { ...item, items: mapCategoriesToNavItems(safeCategories) }
            : item
    );

    return (
        <Sidebar>
            <SearchForm isCollapsed={isCollapsed} />
            <Suspense
                fallback={
                    <SidebarFallback
                        isCollapsed={isCollapsed}
                        categoryCollapseState={categoryState}
                    />
                }
            >
                <NavContent
                    items={navMain.map((item) => ({
                        ...item,
                        icon: item.icon,
                        isCategoryCollapsed: categoryState[item.title] ?? false,
                        toggleCategoryCollapse: () => toggleCategory(item.title),
                    }))}
                    isCollapsed={isCollapsed}
                />
            </Suspense>
            <SidebarRail />
        </Sidebar>
    );
}