"use client";

import React from "react";
import { useCategories } from "@/hooks/useCategories";

export default function UserGuidePage() {
    const categories = useCategories();

    return (
        <div className="p-6 space-y-6">
            {/* Title */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">User Guides</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Browse through our user guides to find step-by-step instructions and solutions.
                </p>
            </div>

            {/* Categories Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {categories.map((category) => (
                <a
                    key={category.id}
                        href={`/user-guide/category/${category.slug}`}
                        className="block p-5 border rounded-lg dark:border-zinc-700 hover:shadow-lg hover:border-zinc-400 dark:hover:border-zinc-500 transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{category.name}</h2>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                            {category.description}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}