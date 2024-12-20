"use client";

import { homepageFeatures, iconMap } from "@/const/homepage-features";
import HomeSearch from "@/components/homepage/homepage-search";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen px-6 py-16">
            {/* Title Section */}
            <h1 className="mb-10 text-3xl font-bold text-center tracking-tight md:text-4xl">
                お役に立てることはございますか？
            </h1>

            {/* Search Bar Section */}
            <div className="mb-12 w-full max-w-lg">
                <HomeSearch/>
            </div>

            {/* Features Section */}
            <div className="grid w-full max-w-4xl grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
                {homepageFeatures.map((feature) => {
                    const IconComponent = iconMap[feature.icon];
                    return (
                        <Link
                            key={feature.title}
                            href={feature.link}
                            className="flex flex-col items-center justify-center gap-2 p-4 transition-transform duration-300 ease-out hover:scale-110"
                        >
                            {/* Render Icon */}
                            <div className="flex items-center justify-center">
                                <IconComponent className="h-10 w-10"/>
                            </div>
                            {/* Title */}
                            <span className="text font-semibold text-center dark:text-gray-200">
                    {feature.title}
                </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}