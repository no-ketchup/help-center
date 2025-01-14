import { Category } from "@/types/Category";

export const mapCategoriesToNavItems = (categories: Category[]) => {
    return categories.map((category) => ({
        title: category.name,
        url: `/category/${category.slug}`,
        description: category.description || "No description available.",
    }));
};