"use client";

import React, {useEffect, useState} from "react";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { BackToTop } from "@/components/utilities/back-to-top";
import { DynamicBreadcrumb } from "@/components/navigation/dynamic-breadcrumb";
import { BreadcrumbProvider } from "@/context/breadcrumb-context";
import { useUIStore } from "@/store/ui-store";

export default function UserGuideLayout({ children }: { children: React.ReactNode }) {
    const isSidebarCollapsed = useUIStore((s) => s.isSidebarCollapsed);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) {
        return null;
    }

    return (
        <BreadcrumbProvider>
            <div
                className="relative flex flex-1"
                style={{
                    paddingTop: "var(--header-height)",
                    paddingBottom: "var(--footer-height)",
                }}
            >
                <div className="relative flex flex-1 w-screen">
                    {/* Sidebar */}
                    <div
                        className={`hidden lg:flex shrink-0 transition-all duration-300 ${
                            isSidebarCollapsed ? "w-16" : "w-64"
                        }`}
                    >
                        <AppSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="relative flex flex-1 flex-col p-6 space-y-6">
                        <DynamicBreadcrumb />
                        {children}
                        <BackToTop />
                    </div>
                </div>
            </div>
        </BreadcrumbProvider>
    );
}