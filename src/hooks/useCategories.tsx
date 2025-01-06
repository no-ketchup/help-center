import { useState, useEffect } from "react";
import { fetchCategories } from "@/lib/fetchCategories";
import { CategoryFields, CategoryEntrySkeleton } from "@/interfaces/contentful";
import { Entry } from "contentful";

function getNonLocalizedField(value: unknown, fallback: string = "Unknown"): string {
    return (value as string) || fallback;
}

function extractFields(entry: Entry<CategoryEntrySkeleton>): CategoryFields {
    return {
        id: entry.sys.id,
        name: getNonLocalizedField(entry.fields.name, "Untitled"),
        description: getNonLocalizedField(entry.fields.description, "Description not available"),
        slug: getNonLocalizedField(entry.fields.slug, "no-slug"),
    };
}

export function useCategories(
    initialCategories: CategoryFields[] = []
): CategoryFields[] {
    const [categories, setCategories] = useState<CategoryFields[]>(initialCategories);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data: Entry<CategoryEntrySkeleton>[] = await fetchCategories();
                const categoryFields = data.map((entry) => extractFields(entry));
                setCategories(categoryFields);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]); // Fallback to empty array
            }
        };

        if (!initialCategories.length) {
            loadCategories();
        }
    }, [initialCategories]);

    return categories;
}