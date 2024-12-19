"use client";

import { Search } from "lucide-react";
import Link from "next/link";

const features = [
    { icon: "✔️", title: "問題追跡システム", link: "/issue-tracker" },
    { icon: "🎧", title: "サポートへの問い合わせ", link: "/contact-support" },
    { icon: "💬", title: "コミュニティフォーラム", link: "/community-forum" },
    { icon: "📚", title: "ドキュメント", link: "/documentation" },
    { icon: "🔑", title: "早期アクセスプログラム", link: "/early-access" },
];

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-100 text-base-content dark:bg-zinc-950 dark:text-gray-100">
            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold text-center dark:text-white">
                お役に立てることはございますか？
            </h1>

            {/* Search Bar */}
            <div className="relative w-full max-w-lg mb-12">
                <input
                    type="search"
                    placeholder="ヘルプセンターで検索"
                    className="daisy-input daisy-input-bordered w-full pl-10 pr-4 py-2 rounded-full dark:bg-zinc-800 dark:text-gray-200 dark:placeholder-gray-400 dark:border-zinc-700 focus:ring-1 focus:ring-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            </div>

            {/* Features Section */}
            <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
                {features.map((feature) => (
                    <Link
                        key={feature.title}
                        href={feature.link}
                        className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:shadow-md hover:border-primary dark:border-gray-700 dark:hover:border-primary-light"
                    >
                        <span className="text-4xl">{feature.icon}</span>
                        <span className="text-sm font-semibold text-center dark:text-gray-200">
                            {feature.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}