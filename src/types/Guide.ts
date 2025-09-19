import { Category } from "./Category";
import { Media } from "./Media";

export interface Guide {
    id: string;
    title: string;
    slug: string;
    body: Record<string, any>; // stored as JSON (rich text structure)
    estimatedReadTime: number;
    createdAt: string;
    updatedAt?: string;

    categories: Category[];
    media: Media[];
}