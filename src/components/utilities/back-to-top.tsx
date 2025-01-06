"use client";

import React, { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

const BackToTop: React.FC = () => {
    const progressRef = useRef<SVGCircleElement | null>(null);
    const [scrollValue, setScrollValue] = useState<number>(0);
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const progressPath = progressRef.current;
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

        const progressPath = progressRef.current;
        if (progressPath) {
            const pathLength = progressPath.getTotalLength();
            progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
            progressPath.style.strokeDashoffset = pathLength.toString();

            const onScroll = () => {
                const scroll = document.documentElement.scrollTop;
                const height =
                    document.documentElement.scrollHeight -
                    document.documentElement.clientHeight;
                const progress = (scroll / height) * pathLength;

                progressPath.style.strokeDashoffset = (pathLength - progress).toString();
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

    return (
        <div
            aria-label="Scroll back to top"
            className={`fixed right-8 bottom-40 h-9 w-9 cursor-pointer rounded-full z-[50] 
            ${
                scrollValue > 50
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
            }
            ${isAtBottom ? "animate-bounce" : ""}`}
            onClick={scrollToTop}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="-3 0 175 150"
                className="relative"
            >
                {/* Handwritten Circle */}
                <path
                    ref={progressRef}
                    d="M3.49703,54.1887L3.49703,54.1887C9.58587,30.2875 24.2465,14.0484 47.0759,5.93148C72.2904,-3.04 97.2641,-2.94483 121.3,13.9716C124.446,16.1809 127.454,18.7706 130.363,21.2719C131.705,22.4277 133.092,23.6203 134.485,24.7715C148.009,38.3321 154.566,56.4392 154.529,72.0147C154.551,78.6263 153.792,85.2173 152.269,91.651C144.291,124.495 121.385,144.127 86.5776,149.325C80.7204,150.198 59.0731,147.96 54.8542,146.118C45.0249,141.839 32.6194,135.689 22.6595,125.729C22.1679,125.238 21.6756,124.727 21.1932,124.217C2.65234,104.451 -3.29738,80.8931 3.49703,54.1887"
                    fill="none"
                    className={`stroke-[10px] ${strokeColor}`}
            />
                <path
                    d="M50.2825 59.9091C51.3305 59.3371 52.3171 58.6593 53.2268 57.8862C53.4441 57.7136 53.66 57.5423 53.8779 57.3743C56.9981 54.9537 60.1166 52.5312 63.2334 50.1067C66.9088 47.2476 70.5883 44.3908 74.2716 41.5361C74.5964 41.3025 74.9402 41.0965 75.2995 40.9205C75.3822 40.8772 75.4669 40.8312 75.5561 40.7833C75.4782 42.3756 75.3993 43.9424 75.3192 45.4834C75.1289 49.2141 74.9483 52.7373 74.8112 56.313C74.5197 63.9548 74.2362 75.1164 73.9618 85.9099C73.7262 95.2043 73.5024 103.983 73.2806 110.432C73.2484 111.695 73.3381 112.959 73.5484 114.205C73.8503 116.109 74.8282 117.072 76.4547 117.072H76.4592C78.2792 117.072 79.3806 115.993 79.563 114.039C79.6138 113.493 79.6661 112.947 79.7199 112.401C79.9365 110.19 80.1603 107.902 80.1892 105.641C80.306 96.624 80.3973 83.8654 80.4859 71.5262C80.5515 61.9116 80.6171 52.8305 80.6933 45.8746C80.7119 45.3713 80.7625 44.8697 80.8449 44.3728C80.86 44.2619 80.8764 44.1471 80.8928 44.029L81.3483 44.4496C81.8897 44.9477 82.3367 45.3599 82.766 45.7892C88.8695 51.7819 95.8662 56.791 103.506 60.6375L103.74 60.7603C104.402 61.1408 105.107 61.4407 105.84 61.6536C106.275 61.7246 106.721 61.6947 107.142 61.5663C107.312 61.5289 107.482 61.4909 107.648 61.4679L107.993 61.4213L107.927 61.0793C107.891 60.8883 107.872 60.6815 107.853 60.4741C107.865 59.9589 107.717 59.4527 107.427 59.0262C106.98 58.5528 106.485 58.1276 105.95 57.7576C105.546 57.471 105.162 57.1581 104.799 56.821C101.987 54.0718 99.1816 51.3165 96.3817 48.5551C92.7522 44.9841 89.1162 41.4194 85.474 37.8607C83.9528 36.2782 82.2771 34.8516 80.4721 33.6024C77.7069 31.8191 75.4038 32.0927 72.7745 34.5087C70.2601 36.8223 67.5238 39.2541 64.4161 41.9431C62.1521 43.8999 59.8805 45.847 57.6013 47.7845C55.1453 49.8808 52.695 51.9836 50.2503 54.0926C49.2636 54.9012 48.3999 55.8493 47.6867 56.907C47.2929 57.5404 47.2397 58.9075 47.7313 59.4391C48.0801 59.7305 48.4982 59.9269 48.9452 60.0092C49.3922 60.0916 49.8528 60.0571 50.2825 59.9091Z"
                    fill="currentColor"/>
            </svg>
        </div>
    );
};

export {
    BackToTop
};