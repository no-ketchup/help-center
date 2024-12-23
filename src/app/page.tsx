"use client";

import { homepageFeatures, iconMap } from "@/const/homepage-features";
import HomeSearch from "@/components/homepage/homepage-search";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 sm:py-5">
            {/* Title Section */}
            <h1 className="mb-8 text-2xl font-bold text-center tracking-tight sm:mb-10 sm:text-3xl md:text-4xl">
                どのようにお手伝いできますか？
            </h1>

            {/* Search Bar Section */}
            <div className="mb-10 w-full max-w-lg sm:mb-14">
                <HomeSearch />
            </div>

            {/* Features Section */}
            <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {homepageFeatures.map((feature) => {
                    const IconComponent = iconMap[feature.icon];
                    return (
                        <Link
                            key={feature.title}
                            href={feature.link}
                            className="flex flex-col items-center justify-center gap-3 p-6 transition-transform duration-300 ease-out hover:scale-110 sm:hover:scale-105"
                        >
                            {/* Render Icon */}
                            <div className="flex items-center justify-center">
                                <IconComponent className="h-12 w-12" />
                            </div>
                            {/* Title */}
                            <span className="text-lg font-semibold text-center dark:text-gray-200">
                                {feature.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}