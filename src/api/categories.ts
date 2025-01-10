import { Category } from "@/types/Category";

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch('/api/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || `Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs;
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
    const response = await fetch(`/api/categories?where[slug][equals]=${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || `Failed to fetch category: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs[0] || null;
};