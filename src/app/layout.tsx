import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Noto_Sans_JP, M_PLUS_1_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { BackToTop } from "@/components/common/back-to-top";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans-jp",
});

const mPlus1Code = M_PLUS_1_Code({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-mplus1-code",
});

export const metadata: Metadata = {
    title: "Yeeflowヘルプセンター",
    description: "何かご不明な点はございませんか？",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja" className="dark" suppressHydrationWarning>
        <body
            className={`${notoSansJP.variable} ${mPlus1Code.variable} antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
        >
            <Header />

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </ThemeProvider>
        <BackToTop />
        </body>
        </html>
    );
}