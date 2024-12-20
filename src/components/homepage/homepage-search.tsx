"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { exampleKeywords } from "@/const/search-keyword-examples";
import { Combobox } from "@headlessui/react";

export default function HomeSearch() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [displayText, setDisplayText] = useState<string>("");
    const [currentKeywordIndex, setCurrentKeywordIndex] = useState<number>(0);
    const [showCursor, setShowCursor] = useState<boolean>(false);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (isInputFocused) return; // Skip animation when input is focused

        const typeKeyword = async () => {
            const keyword = exampleKeywords[currentKeywordIndex];
            setShowCursor(false); // Hide cursor during typing

            for (let i = 0; i <= keyword.length; i++) {
                setDisplayText(keyword.slice(0, i));
                await new Promise((resolve) => setTimeout(resolve, 210)); // Typing speed
            }

            setShowCursor(true); // Show cursor after typing
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Blink

            setShowCursor(false); // Hide cursor before switching
            await new Promise((resolve) => setTimeout(resolve, 1200)); // Pause

            setCurrentKeywordIndex((prev) => (prev + 1) % exampleKeywords.length);
        };

        typeKeyword();
    }, [currentKeywordIndex, isInputFocused]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim() || displayText;
        if (query) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setSearchQuery("");
        }
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Combobox value={searchQuery} onChange={(value) => setSearchQuery(value ?? "")}>
                    <Combobox.Input
                        type="search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        placeholder={searchQuery ? "" : ""}
                        className="w-full pl-3 pr-16 py-4 rounded-md border-2 border-accent-content dark:border-dark-accent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 appearance-none font-light font-mono tracking-tighter text-lg"
                        aria-label="Search"
                    />

                    {/* Dynamic Typing Text with Cursor */}
                    {!searchQuery && !isInputFocused && (
                        <div
                            className="absolute top-1/2 -translate-y-1/2 flex items-center text-gray-400 pointer-events-none pl-3">
                            <span
                                className="whitespace-pre font-light font-mono tracking-tighter text-lg">{displayText}</span>
                            {showCursor && (
                                <span className="w-[2px] h-6 bg-current animate-blink ml-1"></span>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-3 hover:scale-110 transition-transform"
                        aria-label="Search"
                    >
                        <Search className="h-8 w-8"/>
                    </button>
                </Combobox>
            </form>
        </div>
    );
}