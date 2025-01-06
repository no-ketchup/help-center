import client from "@/lib/cmsClient";
import { Entry } from 'contentful';
import { CategoryEntrySkeleton } from '@/interfaces/contentful';

export async function fetchCategories(): Promise<Entry<CategoryEntrySkeleton>[]> {
    try {
        const response = await client.getEntries<CategoryEntrySkeleton>({
            content_type: 'category',
        });
        return response.items;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}