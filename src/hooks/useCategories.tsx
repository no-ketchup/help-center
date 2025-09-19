import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/lib/queries";
import { Category } from "@/types/Category";
import { GetCategoriesResponse } from "@/types/graphql";

type UseCategoriesResult = {
    categories: Category[];
    loading: boolean;
    error: Error | null;
};

export function useCategories(): UseCategoriesResult {
    const { data, loading, error } = useQuery<GetCategoriesResponse>(GET_CATEGORIES);

    return {
        categories: data?.categories ?? [],
        loading,
        error: error ?? null,
    };
}