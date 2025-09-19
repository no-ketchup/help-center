import { Category } from "@/types/Category";

export const mapCategoriesToNavItems = (categories: Category[]) => {
    return categories.map((category) => ({
        id: category.id, // React key
        title: category.name, // UI label
        url: `/category/${category.slug}`, // semantic route
        description: category.description || "No description available.",
    }));
};