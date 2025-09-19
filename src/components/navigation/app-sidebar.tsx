"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFallback,
    SidebarRail,
    useSidebar,
} from "../ui/sidebar";
import NavContent from "./nav-content";
import { useCategories } from "@/hooks/useCategories";
import React, { Suspense, SVGProps, useEffect, useState, useRef } from "react";
import { Collection, Question, Comment } from "../svgs";
import { SearchForm } from "@/components/navigation/search-form";
import { mapCategoriesToNavItems } from "@/components/navigation/nav-utils";
import { handleError } from "@/utils/handleError";

type NavItem = {
    title: string;
    url?: string;
    icon?: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
    items?: { id: string; title: string; url: string; description?: string }[];
};

const navMainData: NavItem[] = [
    { title: "User Guides", icon: Collection, items: [] },
    { title: "FAQs", url: "/faq", icon: Question },
    { title: "Contact", url: "/contact", icon: Comment },
];

const CATEGORY_COLLAPSE_KEY = "userGuideCategories:collapsed";

export function AppSidebar() {
    const { categories, loading, error } = useCategories();
    const { isCollapsed } = useSidebar();

    const [categoryCollapseState, setCategoryCollapseState] = useState<Record<string, boolean>>({});
    const [isHydrated, setIsHydrated] = useState(false);
    const saveTimeout = useRef<NodeJS.Timeout | null>(null);

    // Hydrate collapse state on client
    useEffect(() => {
        try {
            const savedState = localStorage.getItem(CATEGORY_COLLAPSE_KEY);
            if (savedState) {
                setCategoryCollapseState(JSON.parse(savedState));
            }
        } catch (e) {
            console.warn("Failed to load sidebar collapse state", e);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    // Debounced save to localStorage
    const saveToLocalStorage = (newState: Record<string, boolean>) => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
            localStorage.setItem(CATEGORY_COLLAPSE_KEY, JSON.stringify(newState));
        }, 300); // 300ms debounce
    };

    const toggleCategoryCollapse = (category: string) => {
        setCategoryCollapseState((prev) => {
            const newState = { ...prev, [category]: !prev[category] };
            saveToLocalStorage(newState);
            return newState;
        });
    };

    // Loading skeleton
    if (loading) {
        return (
            <Sidebar>
                <SidebarContent>
                    <SidebarFallback
                        isCollapsed={isCollapsed}
                        categoryCollapseState={isHydrated ? categoryCollapseState : {}}
                    />
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
        );
    }

    // Error state
    if (error) {
        const resolvedError = handleError(error);
        return (
            <Sidebar>
                <SidebarContent>
                    <div className="p-4 text-sm text-red-500">
                        Error loading categories: {resolvedError.message}
                    </div>
                </SidebarContent>
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
            <SidebarContent>
                <SearchForm isCollapsed={isCollapsed} />

                <Suspense
                    fallback={
                        <SidebarFallback
                            isCollapsed={isCollapsed}
                            categoryCollapseState={isHydrated ? categoryCollapseState : {}}
                        />
                    }
                >
                    <NavContent
                        items={navMain.map((item) => ({
                            ...item,
                            icon: item.icon,
                            isCategoryCollapsed: categoryCollapseState[item.title] ?? false,
                            toggleCategoryCollapse: () => toggleCategoryCollapse(item.title),
                        }))}
                        isCollapsed={isCollapsed}
                    />
                </Suspense>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}