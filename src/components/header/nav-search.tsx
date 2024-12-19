"use client";

import { useState, useRef } from "react";
import { Search, X, Eraser } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function NavSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Hide the component on "/" and "/search"
    if (pathname === "/" || pathname === "/search") return null;

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
                className={`flex items-center gap-2 transition-all duration-100 ${
                    isOpen ? "w-full max-w-sm p-1 rounded-full" : "w-auto"
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
                        className="w-full text-sm outline-none bg-transparent px-3 pr-8 rounded-full focus:ring-0"
                        placeholder="サイト内検索はこちらで始めてください..."
                        autoFocus={isOpen}
                        style={{
                            WebkitAppearance: "none", // Remove native clear button
                            appearance: "none",
                        }}
                    />
                    {/* Custom Clear Button */}
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label="Clear Search Field"
                        >
                            <Eraser className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    onClick={() => {
                        if (!isOpen) {
                            setIsOpen(true);
                            requestAnimationFrame(() => inputRef.current?.focus());
                        }
                    }}
                    className={`daisy-btn daisy-btn-ghost daisy-btn-circle p-0 h-10 w-10 m-0 transition-transform hover:scale-110 hover:bg-transparent hover:shadow-none ${
                        isOpen ? "order-first" : ""
                    }`}
                    aria-label="Submit Search"
                >
                    <Search className="h-6 w-6" />
                </button>

                {/* Close Button */}
                {isOpen && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            setSearchQuery("");
                        }}
                        className="daisy-btn daisy-btn-ghost daisy-btn-circle p-0 h-10 w-10 m-0 transition-transform hover:bg-transparent hover:shadow-none"
                        aria-label="Close Search"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </form>
        </div>
    );
}