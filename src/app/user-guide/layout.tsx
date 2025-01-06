"use client";

import React from "react";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function UserGuideLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
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
                    <div className="relative flex flex-1 flex-col">{children}</div>
                </div>
            </div>
        </SidebarProvider>
    );
}