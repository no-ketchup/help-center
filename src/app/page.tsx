"use client";

import { homepageFeatures, iconMap } from "@/const/homepage-features";
import HomeSearch from "@/components/homepage/homepage-search";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen px-6 py-10">
            {/* Title Section */}
            <h1 className="mb-8 text-4xl font-medium text-center tracking-tight">
                お役に立てることはございますか？
            </h1>

            {/* Search Bar Section */}
            <div className="mb-12 w-full max-w-lg">
                <HomeSearch/>
            </div>

            {/* Features Section */}
            <div className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {homepageFeatures.map((feature) => {
                    const IconComponent = iconMap[feature.icon];
                    return (
                        <Link
                            key={feature.title}
                            href={feature.link}
                            className="flex flex-col items-center justify-center gap-2 p-4 border rounded-md transition-transform duration-300 ease-out hover:shadow-lg hover:scale-105 hover:border-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:hover:border-primary-light"
                        >
                            {/* Render Icon */}
                            <div className="flex items-center justify-center">
                                <IconComponent className="h-10 w-10"/>
                            </div>
                            {/* Title */}
                            <span className="text-sm font-semibold text-center dark:text-gray-200">
                    {feature.title}
                </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}