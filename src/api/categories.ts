import apiClient from "@/lib/apiClient";


export const fetchCategories = async () => {
    const response = await apiClient.get("/api/categories");
    return response.data.docs || [];
};

export const fetchCategoryBySlug = async (slug: string) => {
    const response = await apiClient.get(`/api/categories?where[slug][equals]=${slug}`);
    return response.data.docs[0] || null;
};