import { create } from "zustand";
import { persist } from "zustand/middleware";

type CategoryState = Record<string, boolean>;

type UIState = {
    // Sidebar
    isSidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;

    // Category collapse
    categoryState: CategoryState;
    toggleCategory: (title: string) => void;
    setCategoryState: (state: CategoryState) => void;

    // Theme
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark") => void;

    // Search
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

// Detect preload classes from RootLayout script
const detectInitialSidebar = () =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("sidebar-collapsed");

// Allow "system" only for first load
const detectInitialTheme = (): "light" | "dark" | "system" => {
    if (typeof document === "undefined") return "system";
    if (document.documentElement.classList.contains("dark")) return "dark";
    return "light";
};

export const useUIStore = create<UIState>()(
    persist(
        (set, get) => ({
            // Sidebar
            isSidebarCollapsed: detectInitialSidebar(),
            setSidebarCollapsed: (collapsed) => {
                if (collapsed) {
                    document.documentElement.classList.add("sidebar-collapsed");
                } else {
                    document.documentElement.classList.remove("sidebar-collapsed");
                }
                set({ isSidebarCollapsed: collapsed });
            },

            // Category collapse
            categoryState: {},
            toggleCategory: (title) =>
                set((state) => ({
                    categoryState: {
                        ...state.categoryState,
                        [title]: !state.categoryState[title],
                    },
                })),
            setCategoryState: (state) => set({ categoryState: state }),

            // Theme
            theme: detectInitialTheme(),
            setTheme: (theme) => {
                // After first toggle, only persist light/dark
                if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
                set({ theme });
            },

            // Search
            searchQuery: "",
            setSearchQuery: (query) => set({ searchQuery: query }),
        }),
        {
            name: "ui-store",
            // Don’t persist "system" back into localStorage
            partialize: (state) => ({
                ...state,
                theme: state.theme === "system" ? undefined : state.theme,
            }),
        }
    )
);