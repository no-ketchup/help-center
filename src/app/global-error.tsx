'use client'; // Error boundaries must be Client Components

import Link from 'next/link';

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="ja">
        <body className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content dark:bg-zinc-950 dark:text-dark-base-content">
        <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
        <p className="text-lg mb-6">
            {error.message || '予期しない問題が発生しました。'}
        </p>
        <div className="flex gap-4">
            <button
                onClick={reset}
                className="daisy-btn daisy-btn-primary"
            >
                再試行する
            </button>
            <Link href="/">
                <a className="daisy-btn daisy-btn-outline">
                    ホームに戻る
                </a>
            </Link>
        </div>
        </body>
        </html>
    );
}