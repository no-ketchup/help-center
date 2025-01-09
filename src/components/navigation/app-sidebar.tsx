"use client";

import { Sidebar, SidebarContent, SidebarRail, useSidebar } from "../ui/sidebar";
import NavContent from "./nav-content";
import { useCategories } from "@/hooks/useCategories";
import React, {SVGProps, useEffect, useState} from "react";
import { Collection, Question, Comment } from "../svgs";
import { SearchForm } from "@/components/navigation/search-form";

type NavItem = {
    title: string;
    url?: string;
    icon?: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
    items?: { title: string; url: string }[];
};

const navMainData: NavItem[] = [
    {
        title: "User Guides",
        icon: Collection,
        items: [],
    },
    {
        title: "FAQs",
        url: "/faq",
        icon: Question,
    },
    {
        title: "Contact",
        url: "/contact",
        icon: Comment,
    },
];

const CATEGORY_COLLAPSE_KEY = "userGuideCategories:collapsed";

export function AppSidebar() {
    const { categories, loading, error } = useCategories();
    const { isCollapsed } = useSidebar();
    const [isReady, setIsReady] = useState(false); // Tracks whether localStorage is ready
    const [categoryCollapseState, setCategoryCollapseState] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Sync with localStorage after the component mounts
        const savedState = localStorage.getItem(CATEGORY_COLLAPSE_KEY);
        setCategoryCollapseState(savedState ? JSON.parse(savedState) : {});
        setIsReady(true); // Mark as ready
    }, []);

    const toggleCategoryCollapse = (category: string) => {
        setCategoryCollapseState((prev) => {
            const newState = { ...prev, [category]: !prev[category] };
            localStorage.setItem(CATEGORY_COLLAPSE_KEY, JSON.stringify(newState));
            return newState;
        });
    };

    // Handle loading or error states for categories
    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>Error loading categories: {error.message}</div>;
    }

    // Dynamically populate categories into the navigation
    const navMain = navMainData.map((item) => {
        if (item.title === "User Guides") {
            return {
                ...item,
                items: categories.map((category) => ({
                    title: category.name,
                    url: `/user-guide/category/${category.slug}`,
                })),
            };
        }
        return item;
    });

    if (!isReady) {
        // Render a placeholder or nothing until localStorage is ready
        return null;
    }

    return (
            <div className="hidden lg:flex">
        <Sidebar>
            <SidebarContent>
                {/* Search Section */}
                <SearchForm isCollapsed={isCollapsed} />
                {/* Navigation */}
                <NavContent
                    items={navMain.map((item) => ({
                        ...item,
                        icon: item.icon,
                        isCategoryCollapsed: categoryCollapseState[item.title] ?? false,
                        toggleCategoryCollapse: () => toggleCategoryCollapse(item.title),
                    }))}
                    isCollapsed={isCollapsed}
                />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
            </div>
    );
}