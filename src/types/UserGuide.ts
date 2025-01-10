import { Category } from "@/types/Category";
import { Media } from "@/types/Media";

export interface UserGuide {
    id: string;
    title: string;
    slug: string;
    body: {
        root: {
            children: Array<{
                children: Array<{
                    detail: number;
                    format: number;
                    mode: string;
                    style: string;
                    text: string;
                    type: string;
                    version: number;
                }>;
                direction: string;
                format: string;
                indent: number;
                type: string;
                version: number;
                textFormat: number;
                textStyle: string;
            }>;
            direction: string;
            format: string;
            indent: number;
            type: string;
            version: number;
        };
    };
    categories: Category[]; // Array of categories
    media: Media[];
    estimatedReadTime: number; // Estimated reading time in minutes
    createdDate: string; // ISO date string
    updatedDate: string; // ISO date string
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}