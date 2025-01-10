import { UserGuide } from "@/types/UserGuide";

export const fetchGuides = async (): Promise<UserGuide[]> => {
    const response = await fetch('/api/user-guides', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch guides: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs;
};

export const fetchGuidesByCategory = async (categorySlug: string): Promise<UserGuide[]> => {
    const response = await fetch(`/api/user-guides?where[categories.slug][equals]=${categorySlug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch guides for category: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs;
};

export const fetchGuideBySlug = async (guideSlug: string): Promise<UserGuide | null> => {
    const response = await fetch(`/api/user-guides?where[slug][equals]=${guideSlug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch guide: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs[0] || null;
};