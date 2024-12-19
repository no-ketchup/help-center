'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    const searchParams = useSearchParams();
    const errorCode = searchParams?.get('code') || '404';

    const errorMessages: Record<string, string> = {
        '403': 'アクセスが禁止されています。',
        '404': 'ページが見つかりません。',
        '500': 'サーバーエラーが発生しました。',
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-base-content dark:bg-zinc-950 dark:text-dark-base-content">
            <Image
                src="/error.png"
                alt="Error Illustration"
                width={600}
                height={405}
                className="mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">エラー {errorCode}</h1>
            <p className="font-semibold text-2xl mb-6">{errorMessages[errorCode] || '不明なエラーが発生しました。'}</p>
            <Link
                href="/"
                className="mt-3 daisy-btn daisy-btn-primary rounded-full px-6 py-2 text-sm font-semibold dark:text-gray-100"
            >
                ホームに戻る
            </Link>
        </div>
    );
}