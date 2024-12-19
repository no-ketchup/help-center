import Link from "next/link";

export default function NavMenuContent() {
    return (
        <nav
            className="menu w-64 min-h-full bg-base-200 text-base-content dark:bg-zinc-950 dark:text-dark-base-content"
            aria-label="Main Navigation"
        >
            <ul className="space-y-4 p-6 pt-12">
                {/* Home - Active */}
                <li>
                    <Link
                        href="/"
                        className="block text-base font-semibold p-3 rounded-lg transition-all hover:text-primary dark:hover:text-primary-light"
                    >
                        ホーム
                    </Link>
                </li>

                {/* Placeholder: Portfolio */}
                <li>
                    <Link
                        href="/portfolio"
                        className="block text-base font-semibold p-3 rounded-lg transition-all hover:text-primary dark:hover:text-primary-light"
                    >
                        <span className="opacity-50">ポートフォリオ (準備中)</span>
                    </Link>
                </li>

                {/* Placeholder: About */}
                <li>
                    <Link
                        href="/about"
                        className="block text-base font-semibold p-3 rounded-lg transition-all hover:text-primary dark:hover:text-primary-light"
                    >
                        <span className="opacity-50">概要 (準備中)</span>
                    </Link>
                </li>

                {/* Placeholder: Blog */}
                <li>
                    <Link
                        href="/blog"
                        className="block text-base font-semibold p-3 rounded-lg transition-all hover:text-primary dark:hover:text-primary-light"
                    >
                        <span className="opacity-50">ブログ (準備中)</span>
                    </Link>
                </li>

                {/* Placeholder: Contact */}
                <li>
                    <Link
                        href="/contact"
                        className="block text-base font-semibold p-3 rounded-lg transition-all hover:text-primary dark:hover:text-primary-light"
                    >
                        <span className="opacity-50">お問い合わせ (準備中)</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}