import { RichTextContent } from "@/interfaces/RichTextContent";
import { TOCItem } from "@/interfaces/TOCItem";

/**
 * Generates a Table of Contents (TOC) from rich text content.
 * @param content - Array of RichTextContent nodes.
 * @returns An array of TOCItem objects representing the headings in the content.
 */
export const generateTOC = (content: RichTextContent[]): TOCItem[] => {
    const toc: TOCItem[] = [];

    /**
     * Traverses the content recursively to extract headings for the TOC.
     * @param nodes - Array of RichTextContent nodes.
     * @param parentAnchor - Anchor of the parent node (used for nested headings).
     */
    const traverseContent = (nodes: RichTextContent[], parentAnchor: string = ''): void => {
        nodes.forEach((node) => {
            if (node.type === 'heading' && node.attrs?.id) {
                // Type narrowing: Check if `level` is a number
                const level = typeof node.attrs.level === 'number' ? node.attrs.level : 2; // Default to H2

                toc.push({
                    title: node.text?.trim() || 'Untitled', // Fallback to "Untitled" if missing text
                    anchor: `${parentAnchor}${node.attrs.id}`,
                    level,
                });
            }

            // Recursively traverse nested content
            if (node.content && Array.isArray(node.content)) {
                traverseContent(node.content, parentAnchor);
            }
        });
    };

    traverseContent(content);

    return toc.sort((a, b) => a.level - b.level); //Sort TOC by heading level
};