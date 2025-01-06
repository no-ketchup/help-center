import {Guide} from "./Guide";

export interface Category {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    revisedAt?: string;
    name: string;
    slug: string;
    description: string;
    guides: Guide[];
}