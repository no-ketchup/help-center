"use client";

import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';

const BackToTop: React.FC = () => {
    const ref = useRef<SVGPathElement | null>(null);
    const [scrollValue, setScrollValue] = useState<number>(0);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const progressPath = ref.current;
        if (progressPath) {
            const pathLength = progressPath.getTotalLength();
            progressPath.style.transition = "none";
            progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
            progressPath.style.strokeDashoffset = pathLength.toString();
            progressPath.getBoundingClientRect(); // Trigger reflow
            progressPath.style.transition = "stroke-dashoffset 0.1s linear";
        }
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;

        const progressPath = ref.current;
        if (progressPath) {
            const pathLength = progressPath.getTotalLength();

            const onScroll = () => {
                const scroll = document.documentElement.scrollTop;
                const height =
                    document.documentElement.scrollHeight -
                    document.documentElement.clientHeight;
                const progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress.toString();
                setScrollValue(scroll);

            const isBottom =
                window.innerHeight + scroll >=
                document.documentElement.scrollHeight - 10;
            setIsAtBottom(isBottom);
        };

        const throttledScroll = throttle(() => {
                window.requestAnimationFrame(onScroll);
            }, 100);

            window.addEventListener("scroll", throttledScroll);
            return () => window.removeEventListener("scroll", throttledScroll);
        }
    }, [mounted]);

    if (!mounted) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const strokeColor = "stroke-gray-500 dark:stroke-gray-300";
    const hoverEffect = "hover:stroke-gray-700 dark:hover:stroke-gray-100 hover:scale-110 hover:drop-shadow-lg";
    const focusRing = "focus:outline-none focus:ring focus:ring-gray-300 dark:focus:ring-gray-600";



    return (
        <div
            aria-label="Scroll back to top"
            className={`fixed right-8 bottom-40 h-9 w-9 cursor-pointer rounded-full z-[50] 
            transition-all duration-200 ${hoverEffect} ${focusRing}
            ${
                scrollValue > 50 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible translate-y-2'
            }
            ${isAtBottom ? "animate-bounce" : ""}`}
           onClick={scrollToTop}
        >
            {/* Progress Circle */}
            <svg
                className="w-full h-full transition-all duration-200"
                viewBox="-1 -1 102 102"
            >
                <path
                    d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                    ref={ref}
                    className={`fill-none ${strokeColor}`}
                    strokeWidth={5}
                />
            </svg>

            {/* Up Arrow */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute left-[50%] top-[50%] h-6 w-6 z-2 transition-all duration-200 fill-none ${strokeColor}`}
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    transform: "translate(-50%, -50%)", // Centering the arrow
                }}
            >
                <path d="M5 3h14"/>
                <path d="m18 13-6-6-6 6"/>
                <path d="M12 7v14"/>
            </svg>
        </div>
    )
        ;
};

export {BackToTop};