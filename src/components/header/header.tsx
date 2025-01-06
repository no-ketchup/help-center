"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "../svgs";
import MobileNavDrawer from "@/components/navigation/nav-drawer";
import HeaderNavSearch from "@/components/header/header-nav-search";
import HeaderNav from "@/components/header/header-nav";
import ThemeToggle from "@/components/header/theme-switcher";

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Handle header visibility based on scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY || currentScrollY === 0) {
                setIsVisible(true); // Show header
            } else {
                setIsVisible(false); // Hide header
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header
            className={`fixed top-0 left-0 w-full h-16 z-50 transition-transform duration-200 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="flex items-center justify-between h-full px-4">
                {/* Left: Logo */}
                <Link href="/" aria-label="Launch Page">
                    <Logo
                        width={40}
                        className="w-[40px] h-auto block scale-125 transition-colors duration-150 ease-out"
                        fill="none"
                        stroke="currentColor"
                    />
                </Link>

                <div className="flex items-center gap-2">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex">
                        <HeaderNav />
                    </div>

                    <HeaderNavSearch />

                    {/* Mobile Navigation Drawer */}
                    <div className="md:hidden">
                        <MobileNavDrawer />
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}