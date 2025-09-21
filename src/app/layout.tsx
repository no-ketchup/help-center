import Header from "../components/header/header";
import Footer from "../components/footer/footer";
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
            {/* Preload script: apply theme + sidebar state before hydration */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
(function() {
  try {
    var store = localStorage.getItem('ui-store');
    var parsed = store ? JSON.parse(store) : {};
    var state = parsed?.state || {};

    // Theme
    var t = state.theme || 'system';
    if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Sidebar
    if (state.isSidebarCollapsed) {
      document.documentElement.classList.add('sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
    }
  } catch (_) {}
})();
                    `,
                }}
            />
        </head>
        <body className="antialiased flex flex-col">
        <ApolloWrapper>
            <UpdateLayoutVariables />

            {/* Header */}
            <div className="w-full max-w-screen-xl mx-auto px-0">
                <Header />
            </div>

            {/* Main */}
            <div className="flex flex-col w-screen min-h-screen px-0">
                <main className="flex flex-1 flex-col relative">{children}</main>
            </div>

            {/* Footer */}
            <div className="w-full max-w-screen-xl mx-auto px-0">
                <Footer />
            </div>
        </ApolloWrapper>
        </body>
        </html>
    );
}