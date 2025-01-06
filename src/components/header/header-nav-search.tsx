"use client";

import { useState, useRef } from "react";
import { Search, X, Eraser } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function HeaderNavSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === "/" || pathname === "/search" || pathname === "/user-guide") return null;

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setIsOpen(false);
        }
    };

    return (
        <div className="relative flex items-center justify-end">
            <form
                onSubmit={handleSearchSubmit}
                className={`flex items-center gap-0 transition-all duration-100 ${
                    isOpen ? "w-full max-w-sm p-1 border-b border-dashed border-gray-300 dark:border-gray-600" : "w-auto"
                }`}
            >
                {/* Input Field */}
                <div className={`relative ${isOpen ? "flex-grow" : "hidden"}`}>
                    <input
                        ref={inputRef}
                        type="text" // Use type="text" to prevent browser clear buttons
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                        className="w-full h-10 text-sm outline-none bg-transparent px-1 pr-10 rounded-full focus:ring-0"
                        placeholder="search..."
                        autoFocus={isOpen}
                        style={{
                            WebkitAppearance: "none", // Remove native clear button
                            appearance: "none",
                        }}
                    />
                    {/* Custom Clear Button */}
                    {searchQuery && (
                        <Button
                            variant="clear"
                            size="icon"
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            aria-label="Clear Search Field"
                        >
                            <Eraser className="w-4 h-4" />
                        </Button>
                    )}
                </div>

                {/* Search Button */}
                <Button
                    variant="clear"
                    size="icon"
                    type="submit"
                    onClick={() => {
                        if (!isOpen) {
                            setIsOpen(true);
                            requestAnimationFrame(() => inputRef.current?.focus());
                        }
                    }}
                    className={`transition-transform hover:scale-110 ${
                        isOpen ? "order-first" : ""
                    }`}
                    aria-label="Submit Search"
                >
                    <Search className="h-8 w-8" />
                </Button>

                {/* Close Button */}
                {isOpen && (
                    <Button
                        variant="clear"
                        size="icon"
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            setSearchQuery("");
                        }}
                        className="transition-transform hover:scale-110"
                        aria-label="Close Search"
                    >
                        <X className="w-6 h-6" />
                    </Button>
                )}
            </form>
        </div>
    );
}