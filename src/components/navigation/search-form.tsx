"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "../svgs";

type SearchFormProps = {
    isCollapsed: boolean;
};

export function SearchForm({ isCollapsed }: SearchFormProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery(""); // Clear the query after navigation
        }
    };

    const handleSearchIconClick = () => {
        if (isCollapsed) {
            // Navigate to the search page directly in collapsed state
            router.push("/search");
        } else {
            // Focus the input field if sidebar is expanded
            if (inputRef.current) {
                inputRef.current.focus();
                if (searchQuery.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery(""); // Clear query after navigation
                }
            }
        }
    };

    return (
        <div className={`p-2 ${isCollapsed ? "flex justify-center" : "pl-0 pr-10 py-1"}`}>
            <form
                onSubmit={handleSearchSubmit}
                className={`flex items-center ${
                    isCollapsed ? "justify-center" : "justify-start"
                }`}
            >
                {/* Search Icon */}
                <button
                    type="button"
                    onClick={handleSearchIconClick}
                    className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-muted dark:hover:bg-muted/80"
                    aria-label="Search"
                >
                    <Search
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-6 h-6"
                        aria-hidden="true"
                    />
                </button>

                {/* Search Input (only visible in expanded state) */}
                {!isCollapsed && (
                    <input
                        type="text"
                        ref={inputRef}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="search the site..."
                        className="flex-1 h-10 text-sm pl-3 pr-2 border-b border-dashed border-zinc-400 dark:border-zinc-300 bg-transparent outline-none dark:placeholder-gray-400 dark:text-white"
                    />
                )}
            </form>
        </div>
    );
}