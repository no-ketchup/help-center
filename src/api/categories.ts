import apiClient from '@/lib/apiClient';

export const fetchCategories = async () => {
    try {
        const response = await apiClient.get('/api/categories');
        return response.data.docs;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchCategoryBySlug = async (slug: string) => {
    const res = await apiClient.get('/api/categories', {
        params: {
            where: {
                slug: {
                    equals: slug,
                },
            },
        },
    });

    if (res.data.docs.length === 0) {
        return null; // No category found
    }

    return res.data.docs[0]; // Return the first category
};