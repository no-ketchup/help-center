"use client";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Top Section */}
            <footer
                className="daisy-footer font-zen-old-mincho font-medium text-sm tracking-tighter hidden sm:grid sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-6">
                <nav>
                    <h6 className="daisy-footer-title" role="heading" aria-level={2}>プラットフォーム</h6>
                    <a
                        href="https://jp.yeeflow.com/app-development"
                        className="daisy-link daisy-link-hover"
                        aria-label="アプリケーション開発"
                    >
                        アプリケーション開発
                    </a>
                    <a
                        href="https://jp.yeeflow.com/workflow-automation"
                        className="daisy-link daisy-link-hover"
                        aria-label="ワークフローの自動化"
                    >
                        ワークフローの自動化
                    </a>
                    <a
                        href="https://jp.yeeflow.com/data-management"
                        className="daisy-link daisy-link-hover"
                        aria-label="データ管理"
                    >
                        データ管理
                    </a>
                    <a
                        href="https://jp.yeeflow.com/self-service-portal"
                        className="daisy-link daisy-link-hover"
                        aria-label="サービスポータル"
                    >
                        サービスポータル
                    </a>
                </nav>
                <nav>
                    <h6 className="daisy-footer-title" role="heading" aria-level={2}>リソース</h6>
                    <a
                        href="https://jp.yeeflow.com/integrations"
                        className="daisy-link daisy-link-hover"
                        aria-label="統合"
                    >
                        統合
                    </a>
                    <a
                        href="https://jp.yeeflow.com/contact-sales"
                        className="daisy-link daisy-link-hover"
                        aria-label="営業担当"
                    >
                        営業担当
                    </a>
                    <a
                        href="https://templates.yeeflow.com/"
                        className="daisy-link daisy-link-hover"
                        aria-label="アプリテンプレート"
                    >
                        アプリテンプレート
                    </a>
                    <a
                        href="https://news.yeeflow.com/"
                        className="daisy-link daisy-link-hover"
                        aria-label="製品アップデート"
                    >
                        製品アップデート
                    </a>
                </nav>
                <nav>
                    <h6 className="daisy-footer-title" role="heading" aria-level={2}>ご利用情報</h6>
                    <a
                        href="https://jp.yeeflow.com/security"
                        className="daisy-link daisy-link-hover"
                        aria-label="セキュリティ"
                    >
                        セキュリティ
                    </a>
                    <a
                        href="https://jp.yeeflow.com/terms"
                        className="daisy-link daisy-link-hover"
                        aria-label="利用規約"
                    >
                        利用規約
                    </a>
                    <a
                        href="https://jp.yeeflow.com/privacy"
                        className="daisy-link daisy-link-hover"
                        aria-label="プライバシーポリシー"
                    >
                        プライバシーポリシー
                    </a>
                </nav>
            </footer>

            {/* Bottom Section */}
            <footer
                className="daisy-footer border-t border-dotted border-dark-base-300 dark:border-base-300 px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <aside className="flex items-center gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className={`dark:fill-[#F5F5F5] fill-[#1A49D8] transition-colors duration-150 ease-out`}
                    >
                        <g id="logo" transform="scale(0.15)">
                            <path xmlns="http://www.w3.org/2000/svg"
                                  d="M240 101.797L176.281 138.583V64.9996L240 101.797ZM138.773 0V160.241L101.252 138.583V103.674L71.0217 121.122L67.7501 119.233V84.3467L37.533 101.797L0 80.1265L138.773 0ZM101.252 97.6526V64.9996L72.9623 81.3371V113.983L101.252 97.6526Z"
                            />
                        </g>
                    </svg>
                    <p className="text-footer-font font-medium">
                        Yeeflow © {currentYear}
                        <br/>
                        働き方を変え、生産性を高めましょう
                    </p>
                </aside>

                {/* Social Links */}
                <nav className="grid-flow-col gap-6 md:place-self-center md:justify-self-end">
                    <a href="https://twitter.com/yeeflow" aria-label="Twitter">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current hover:opacity-70 transition-opacity duration-300">
                            <path
                                d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                        </svg>
                    </a>
                    <a href="https://www.youtube.com/c/yeeflow" aria-label="YouTube">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current hover:opacity-70 transition-opacity duration-300">
                            <path
                                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/goyeeflow" aria-label="Facebook">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current hover:opacity-70 transition-opacity duration-300">
                            <path
                                d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/company/yeeflowsg" aria-label="LinkedIn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current hover:opacity-70 transition-opacity duration-300">
                            <path
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </nav>
            </footer>
        </>
    );
}