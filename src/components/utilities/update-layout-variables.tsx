"use client";

import { useEffect } from "react";

export function UpdateLayoutVariables() {
    useEffect(() => {
        const updateVariables = () => {
            const header = document.querySelector("header");
            const footer = document.querySelector("footer");

            const headerHeight = header?.getBoundingClientRect().height || 0;
            const footerHeight = footer?.getBoundingClientRect().height || 0;

            // Set CSS variables on the root element
            document.documentElement.style.setProperty(
                "--header-height",
                `${headerHeight}px`
            );
            document.documentElement.style.setProperty(
                "--footer-height",
                `${footerHeight}px`
            );
        };

        // Initial call
        updateVariables();

        // Update on resize
        window.addEventListener("resize", updateVariables);
        return () => {
            window.removeEventListener("resize", updateVariables);
        };
    }, []);

    return null; // No UI rendered
}