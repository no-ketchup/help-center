"use client";

import Link from "next/link";
import Head from "next/head";
import cn from "classnames";
import Image from "next/image";

interface ErrorPageProps {
    code: number;
    title: string;
    subtitle?: string;
    showIllustration?: boolean;
}

export default function ErrorPage({
                                      code,
                                      title,
                                      subtitle,
                                      showIllustration = true,
                                  }: ErrorPageProps) {
    return (
        <div
            className={cn(
                "min-h-screen flex flex-col items-center justify-center bg-base-100 dark:bg-darkbg px-4"
            )}
        >
            <Head>
                <title>{`${code} – ${title}`}</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            {/* Illustration with soft outline in dark mode */}
            {showIllustration && (
                <div className="max-w-sm">
                    <Image
                        src="/error.png"
                        alt="Error illustration"
                        width={250}
                        height={250}
                        priority
                        className="object-contain dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                    />
                </div>
            )}

            {/* Title */}
            <h1 className="mt-8 text-2xl font-bold text-center text-gray-900 dark:text-white">
                {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
                <p className="mt-4 text-base text-center text-gray-600 dark:text-gray-400">
                    {subtitle}
                </p>
            )}

            {/* Back to Home Button */}
            <Link
                href="/"
                className={cn(
                    "mt-6 rounded-full px-6 py-2 text-sm font-semibold transition",
                    "bg-primary text-white hover:bg-primary-focus",
                    "dark:bg-transparent dark:border dark:border-gray-600 dark:text-gray-200 dark:hover:border-primary dark:hover:text-primary"
                )}
            >
                Back to Home
            </Link>
        </div>
    );
}