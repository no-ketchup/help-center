import {RichTextContent} from "./RichTextContent";
import {Category} from "./Category";
import {Media} from "./Media";
import {TOCItem} from "./TOCItem";
import {Step} from "./Step";

export interface Guide {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    revisedAt?: string;
    title: string;
    slug: string;
    estimatedReadTime?: number;
    summary?: string;
    category?: Category;
    content: RichTextContent;
    media?: Media[];
    steps?: Step[];
    tags?: string[];
    relatedGuides?: Guide[];
    toc?: TOCItem[];
    isHelpful?: string[];
}