import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { BackToTop } from "@/components/common/back-to-top";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    variable: "--font-zen-kaku-gothic-new",
});

const zenOldMincho = Zen_Old_Mincho({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-zen-old-mincho",
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
            className={`${zenKakuGothicNew.variable} ${zenOldMincho.variable} antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
        >
            <Header/>

            {/* Main Content */}
            <main
                className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8 pt-16 pb-16 md:pb-20"
            >
                {children}
            </main>

            <Footer/>
        </ThemeProvider>
        <BackToTop/>
        </body>
        </html>
    );
}