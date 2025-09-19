import { useQuery } from "@apollo/client/react";
import { GET_GUIDES, GET_GUIDE } from "@/lib/queries";

export function useGuides() {
    return useQuery(GET_GUIDES);
}

export function useGuideBySlug(slug: string) {
    return useQuery(GET_GUIDE, { variables: { slug } });
}