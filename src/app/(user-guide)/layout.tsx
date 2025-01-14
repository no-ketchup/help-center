"use client";

import React from "react";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BackToTop } from "@/components/utilities/back-to-top";
import { DynamicBreadcrumb } from "@/components/navigation/dynamic-breadcrumb";
import { BreadcrumbProvider } from "@/context/breadcrumb-context";

export default function UserGuideLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <BreadcrumbProvider>
                <div
                    className="relative flex flex-1"
                    style={{
                        paddingTop: "var(--header-height)", // Dynamic top padding
                        paddingBottom: "var(--footer-height)", // Dynamic bottom padding
                    }}
                >
                    <div className="relative flex flex-1 w-screen">
                        {/* Sidebar */}
                        <AppSidebar />

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