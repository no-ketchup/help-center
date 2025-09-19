import { useCategories } from "@/hooks/useCategories";
import { handleError } from "@/utils/handleError";
import { mapCategoriesToNavItems } from "@/components/navigation/nav-utils";

export function useNavItems() {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return { navItems: [], loading: true, error: null };
    }

    if (error) {
        const resolvedError = handleError(error);
        return { navItems: [], loading: false, error: resolvedError };
    }

    const navItems = [
        {
            title: "User Guides",
            items: mapCategoriesToNavItems(categories),
        },
        { title: "FAQs", url: "/faq" },
        { title: "Contact", url: "/contact" },
    ];

    return { navItems, loading: false, error: null };
}