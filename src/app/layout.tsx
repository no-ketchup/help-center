import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { UpdateLayoutVariables } from "@/components/utilities/update-layout-variables";
import "./globals.css";

export const metadata: Metadata = {
    title: "Help center",
    description: "A sample dedicated application for documents and support",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="antialiased flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <UpdateLayoutVariables />

            {/* Global Header */}
            <div className="w-full max-w-screen-xl mx-auto px-0">
                <Header />
            </div>

            {/* Main Container */}
            <div className="flex flex-col w-screen min-h-screen px-0">
                <main className="flex flex-1 flex-col relative">
                    {children}
                </main>
            </div>

            {/* Global Footer */}
            <div className="w-full max-w-screen-xl mx-auto px-0">
                <Footer />
            </div>

        </ThemeProvider>
        </body>
        </html>
    );
}