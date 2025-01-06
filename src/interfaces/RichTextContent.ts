export interface RichTextContent {
    type: string;
    content?: RichTextContent[];
    text?: string;
    attrs?: Record<string, unknown>;
}