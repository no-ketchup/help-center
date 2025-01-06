"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { exampleKeywords } from "@/const/search-keyword-examples";
import {
    Command,
    CommandInput,
} from "../ui/command";
import cn from "classnames";

export default function HelpCenterSearch() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [displayText, setDisplayText] = useState<string>("");
    const [currentKeywordIndex, setCurrentKeywordIndex] = useState<number>(0);
    const [showCursor, setShowCursor] = useState<boolean>(false);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const animationTimeouts = useRef<number[]>([]);

    // Clears all timeouts for animations
    const clearAnimationTimeouts = () => {
        animationTimeouts.current.forEach(clearTimeout);
        animationTimeouts.current = [];
    };

    // Clears the search query input
    const handleClear = () => setSearchQuery("");

    // Handles the search submission
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim() || displayText;
        if (query) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setSearchQuery(""); // Reset search query
            setOpen(false);
        }
    };

    // Effect for animating typing and deleting keywords
    useEffect(() => {
        if (isInputFocused) {
            clearAnimationTimeouts(); // Stop animations when input is focused
            setDisplayText(""); // Clear display text
            setShowCursor(false); // Hide cursor
            return;
        }

        const animateKeyword = () => {
            const keyword = exampleKeywords[currentKeywordIndex];
            setShowCursor(false);

            // Typing animation
            for (let i = 0; i <= keyword.length; i++) {
                animationTimeouts.current.push(
                    window.setTimeout(() => setDisplayText(keyword.slice(0, i)), i * 120)
                );
            }

            // Pause after typing
            animationTimeouts.current.push(
                window.setTimeout(() => setShowCursor(true), keyword.length * 120)
            );

            // Pause before deleting
            animationTimeouts.current.push(
                window.setTimeout(() => setShowCursor(false), keyword.length * 120 + 1500)
            );

            // Deleting animation
            for (let i = keyword.length; i >= 0; i--) {
                animationTimeouts.current.push(
                    window.setTimeout(
                        () => setDisplayText(keyword.slice(0, i)),
                        keyword.length * 120 + 1500 + (keyword.length - i) * 80
                    )
                );
            }

            // Move to the next keyword
            animationTimeouts.current.push(
                window.setTimeout(() => {
                    setCurrentKeywordIndex((prev) => (prev + 1) % exampleKeywords.length);
                }, keyword.length * 120 + 1500 + keyword.length * 80)
            );
        };

        animateKeyword();
        return clearAnimationTimeouts;
    }, [currentKeywordIndex, isInputFocused]);

    return (
        <div className="relative w-full mx-auto max-w-4xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                <Command
                    className={cn(
                        "relative w-full bg-gray-100 dark:bg-charcoal py-4 rounded-md shadow-sm",
                        "max-w-none"
                    )}
                >
                    <div className="relative flex w-full items-center">
                        {/* Search Button */}
                        <button
                            type="submit"
                            className="absolute left-4 top-1/2 -translate-y-1/2"
                            aria-label="Search"
                        >
                            <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </button>

                        {/* Search Input */}
                        <CommandInput
                            value={searchQuery}
                            onValueChange={(value) => {
                                setSearchQuery(value ?? "");
                                setOpen(!!value);
                            }}
                            onFocus={() => {
                                setIsInputFocused(true);
                                setOpen(true);
                            }}
                            onBlur={() => {
                                setTimeout(() => setOpen(false), 200);
                                setIsInputFocused(false);
                            }}
                            className="w-full pl-12 pr-12 py-4 bg-transparent outline-none tracking-tighter text-lg"
                            aria-label="Search"
                        />

                        {/* Clear Button */}
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:scale-110 transition-transform"
                                aria-label="Clear Search"
                            >
                                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        )}
                    </div>
                </Command>

                {/* Dropdown for Search Results */}
                {open && searchQuery && (
                    <div
                        className="absolute z-10 -mt-1.5 top-full w-full bg-gray-100 dark:bg-slate-950 border-t border-dotted border-gray-200 dark:border-slate-800"
                    >
                        <ul className="py-2">
                            {searchQuery ? (
                                <>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer"
                                        onClick={() => router.push(`/search?q=${searchQuery}`)}
                                    >
                                        {`Search results for "${searchQuery}"`}
                                    </li>
                                </>
                            ) : (
                                <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                                    No results found.
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </form>

            {/* Placeholder Animation */}
            {!searchQuery && !isInputFocused && (
                <div
                    className="absolute top-1/2 -translate-y-1/2 flex items-center text-gray-400 pointer-events-none pl-12">
                    <span className="whitespace-pre tracking-tighter text-lg">{displayText}</span>
                    {showCursor && <span className="w-[2px] h-6 bg-current animate-blink ml-1"/>}
                </div>
            )}
        </div>
    );
}