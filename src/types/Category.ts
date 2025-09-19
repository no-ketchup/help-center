import { Guide } from "@/types/Guide";

export interface Category {
    id: string;
    name: string;
    description: string;
    slug: string;
    createdAt: string; // ISO date string
    updatedAt?: string; // ISO date string
    guides?: Guide[];
}