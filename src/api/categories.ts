import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES, GET_CATEGORY } from "@/lib/queries";

export function useCategories() {
    return useQuery(GET_CATEGORIES);
}

export function useCategoryBySlug(slug: string) {
    return useQuery(GET_CATEGORY, { variables: { slug } });
}