"use client";

import { useState, useEffect, useRef } from "react";
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
    const animationTimeouts = useRef<number[]>([]);

    const clearAnimationTimeouts = () => {
        animationTimeouts.current.forEach(clearTimeout);
        animationTimeouts.current = [];
    };

    useEffect(() => {
        if (isInputFocused) {
            clearAnimationTimeouts(); // Clear animation when input is focused
            setDisplayText(""); // Reset display text
            setShowCursor(false); // Hide cursor
            return;
        }

        const typeAndDeleteKeyword = async () => {
            const keyword = exampleKeywords[currentKeywordIndex];
            setShowCursor(false);

            // Typing effect
            for (let i = 0; i <= keyword.length; i++) {
                animationTimeouts.current.push(
                    window.setTimeout(() => setDisplayText(keyword.slice(0, i)), i * 210)
                );
            }

            // Pause after typing
            animationTimeouts.current.push(
                window.setTimeout(() => setShowCursor(true), keyword.length * 210)
            );

            // Deleting effect
            animationTimeouts.current.push(
                window.setTimeout(() => setShowCursor(false), keyword.length * 210 + 2000)
            );

            for (let i = keyword.length; i >= 0; i--) {
                animationTimeouts.current.push(
                    window.setTimeout(() => setDisplayText(keyword.slice(0, i)),
                        keyword.length * 210 + 2000 + (keyword.length - i) * 150)
                );
            }

            // Move to the next keyword
            animationTimeouts.current.push(
                window.setTimeout(() => {
                    setCurrentKeywordIndex((prev) => (prev + 1) % exampleKeywords.length);
                }, keyword.length * 210 + 2000 + keyword.length * 150)
            );
        };

        typeAndDeleteKeyword();

        return () => {
            clearAnimationTimeouts(); // Cleanup on unmount or re-render
        };
    }, [currentKeywordIndex, isInputFocused]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim() || displayText;
        if (query) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setSearchQuery("");
        }
    };

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Combobox value={searchQuery} onChange={(value) => setSearchQuery(value ?? "")}>
                    <Combobox.Input
                        type="search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={searchQuery ? "" : ""}
                        className="w-full pl-3 pr-16 py-4 rounded-md border-2 border-accent-content dark:border-dark-base-200 bg-gray-100 dark:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 appearance-none font-light font-mono tracking-tighter text-lg"
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