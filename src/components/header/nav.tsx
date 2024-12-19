"use client";

import ThemeToggle from "@/components/header/theme-switcher";
import NavSearch from "@/components/header/nav-search";
import NavMenuContent from "@/components/header/nav-menu-content";
import { Menu } from "lucide-react";

export default function Nav() {
    return (
        <div className="daisy-join w-full">
            <nav className="daisy-navbar flex items-center justify-end gap-x-2 p-0">
                {/* Search */}
                <div className="flex daisy-join-item">
                    <NavSearch />
                </div>

                {/* Theme Toggle */}
                <div className="flex daisy-join-item">
                    <ThemeToggle />
                </div>

                {/* Drawer Menu */}
                <div className="flex daisy-drawer-end daisy-join-item">
                    <input id="menu-drawer" type="checkbox" className="daisy-drawer-toggle" />
                    <label
                        htmlFor="menu-drawer"
                        className="daisy-btn daisy-btn-ghost daisy-drawer-button p-0 h-8 w-8 -mr-2 m-0 hover:bg-transparent hover:scale-110 transition-transform"
                        aria-label="Menu"
                    >
                        <Menu className="h-6 w-6" />
                    </label>

                    {/* Drawer Content */}
                    <div className="daisy-drawer-side z-[100]">
                        <label htmlFor="menu-drawer" aria-label="Close" className="daisy-drawer-overlay"></label>
                        <NavMenuContent />
                    </div>
                </div>
            </nav>
        </div>
    );
}