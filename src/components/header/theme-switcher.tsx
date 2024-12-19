"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <label
            htmlFor="theme-toggle"
            className="relative flex h-6 w-12 cursor-pointer items-center rounded-full bg-slate-100 dark:bg-slate-900 transition-colors flex-shrink-0 p-1.5"
        >
            {/* Hidden Checkbox */}
            <input
                id="theme-toggle"
                type="checkbox"
                checked={resolvedTheme === "dark"}
                onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="peer sr-only"
            />

            {/* Sun Icon (Visible in Light Mode) */}
            <div className="absolute left-1 top-1/2 -translate-y-1/2 text-amber-400 transition-all duration-300 peer-checked:opacity-0 hover:scale-110 hover:rotate-5 hover:drop-shadow-[0_0_6px_rgba(255,180,0,0.8)]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            </div>

            {/* Moon Icon (Visible in Dark Mode) */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-100 opacity-0 transition-all duration-300 peer-checked:opacity-100 hover:scale-110 hover:rotate-10 hover:drop-shadow-[0_0_6px_rgba(200,200,255,0.8)]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            </div>

        </label>
    );
}