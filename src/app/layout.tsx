import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { UpdateLayoutVariables } from "@/components/utilities/update-layout-variables";
import ApolloWrapper from "@/components/providers/apollo-wrapper";

import "./globals.css";
import {
    IBM_Plex_Sans,
    IBM_Plex_Mono,
    IBM_Plex_Serif,
} from "next/font/google";

const plexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-plex-sans",
    display: "swap",
});

const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-plex-mono",
    display: "swap",
});

const plexSerif = IBM_Plex_Serif({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-plex-serif",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Help center",
    description: "A sample dedicated application for documents and support",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`}
            suppressHydrationWarning
        >
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (_) {}
})();
            `,
                }}
            />
        </head>
        <body className="antialiased flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ApolloWrapper>
                <UpdateLayoutVariables />

                {/* Global Header */}
                <div className="w-full max-w-screen-xl mx-auto px-0">
                    <Header />
                </div>

                {/* Main Container */}
                <div className="flex flex-col w-screen min-h-screen px-0">
                    <main className="flex flex-1 flex-col relative">{children}</main>
                </div>

                {/* Global Footer */}
                <div className="w-full max-w-screen-xl mx-auto px-0">
                    <Footer />
                </div>
            </ApolloWrapper>
        </ThemeProvider>
        </body>
        </html>
    );
}