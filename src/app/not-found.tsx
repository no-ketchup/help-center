"use client";

import Link from "next/link";
import Head from "next/head";
import cn from "classnames";
import Image from "next/image";
import "./globals.css";

export default function NotFound() {
    return (
        <div className={cn("min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content dark:bg-zinc-950 dark:text-gray-100")}>
            <Head>
                <title>ページが見つかりません</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            {/* Illustration */}
            <div className="max-w-sm">
                <Image
                    src="/error.png"
                    alt="Error illustration"
                    width={400}
                    height={270}
                    priority
                    className="object-contain"
                />
            </div>

            {/* Title */}
            <h1 className="mt-8 text-2xl font-bold text-center dark:text-white">
                ページが見つかりません
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base text-center text-gray-600 dark:text-gray-400">
                URLが正しいかをご確認ください。それでも解決しない場合は、トップページにお戻りください。
            </p>

            {/* Back to Home Button */}
            <Link
                href="/"
                className="mt-6 daisy-btn daisy-btn-primary rounded-full px-6 py-2 text-sm font-semibold dark:text-gray-100"
            >
                ホームに戻る
            </Link>
        </div>
    );
}