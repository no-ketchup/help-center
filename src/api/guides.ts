import apiClient from "@/lib/apiClient";
import { UserGuide } from "@/types/UserGuide";

// Fetch all guides
export const fetchGuides = async (): Promise<UserGuide[]> => {
    try {
        const response = await apiClient.get("/api/user-guides");
        return response.data.docs || []; // Return guides or an empty array
    } catch (error) {
        console.error("Error fetching guides:", error);
        throw new Error("Failed to fetch guides.");
    }
};

// Fetch guides by category slug
export const fetchGuidesByCategory = async (categorySlug: string): Promise<UserGuide[]> => {
    try {
        const response = await apiClient.get(`/api/user-guides`, {
            params: {
                "where[categories.slug][equals]": categorySlug, // Use query parameters
            },
        });
        return response.data.docs || []; // Return guides or an empty array
    } catch (error) {
        console.error(`Error fetching guides for category '${categorySlug}':`, error);
        throw new Error("Failed to fetch guides for the specified category.");
    }
};

// Fetch a single guide by slug
export const fetchGuideBySlug = async (guideSlug: string): Promise<UserGuide | null> => {
    try {
        const response = await apiClient.get(`/api/user-guides`, {
            params: {
                "where[slug][equals]": guideSlug, // Use query parameters
            },
        });
        return response.data.docs[0] || null; // Return the first guide or null
    } catch (error) {
        console.error(`Error fetching guide by slug '${guideSlug}':`, error);
        throw new Error("Failed to fetch the specified guide.");
    }
};