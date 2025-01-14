"use client";
import Link from "next/link";
import { Collection, Comment, Question } from "../svgs";

export default function QuickLinks() {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 uppercase">
            {/* User Guide */}
            <Link href="/category" className="flex items-center gap-3 p-2 transition">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 hover:scale-110">
                    <Collection
                        className="w-full h-full"
                        stroke="currentColor"
                        strokeWidth={2}
                    />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-medium leading-none hover:underline">
                    User Guides
                </h2>
            </Link>

            {/* FAQ */}
            <Link href="/faq" className="flex items-center gap-3 p-2 transition">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 hover:scale-110">
                    <Question
                        className="w-full h-full"
                        stroke="currentColor"
                        strokeWidth={2}
                    />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-medium leading-none hover:underline">
                    FAQ
                </h2>
            </Link>

            {/* Contact */}
            <Link href="/contact" className="flex items-center gap-3 p-2 transition">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 hover:scale-110">
                    <Comment
                        className="w-full h-full"
                        stroke="currentColor"
                        strokeWidth={2}
                    />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-medium leading-none hover:underline">
                    Contact Us
                </h2>
            </Link>
        </section>
    );
}