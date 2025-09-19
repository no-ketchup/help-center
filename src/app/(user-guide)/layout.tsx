"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BackToTop } from "@/components/utilities/back-to-top";
import { DynamicBreadcrumb } from "@/components/navigation/dynamic-breadcrumb";
import { BreadcrumbProvider } from "@/context/breadcrumb-context";
import { SidebarFallback } from "@/components/ui/sidebar"; // your skeleton

export default function UserGuideLayout({ children }: { children: React.ReactNode }) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <SidebarProvider>
            <BreadcrumbProvider>
                <div
                    className="relative flex flex-1"
                    style={{
                        paddingTop: "var(--header-height)",
                        paddingBottom: "var(--footer-height)",
                    }}
                >
                    <div className="relative flex flex-1 w-screen">
                        {/* Sidebar (always rendered, consistent container) */}
                        <div className="hidden lg:flex w-64 shrink-0">
                            {hydrated ? (
                                <AppSidebar />
                            ) : (
                                <SidebarFallback isCollapsed={false} categoryCollapseState={{}} />                            )}
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
        </SidebarProvider>
    );
}