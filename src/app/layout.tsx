import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { BackToTop } from "@/components/common/back-to-top";

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
        <body className="antialiased">
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