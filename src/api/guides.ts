import apiClient from "@/lib/apiClient";

export const fetchGuides = async () => {
    const res = await apiClient.get('/api/user-guides');
    return res.data.docs;
};

export const fetchGuidesByCategory = async (categorySlug: string) => {
    const res = await apiClient.get('/api/user-guides', {
        params: {
            where: {
                categories: {
                    slug: {
                        equals: categorySlug,
                    },
                },
            },
        },
    });
    return res.data.docs;
};

export const fetchGuideBySlug = async (guideSlug: string) => {
    const res = await apiClient.get('/api/user-guides', {
        params: {
            where: {
                slug: {
                    equals: guideSlug,
                },
            },
        },
    });
    return res.data.docs[0];
};