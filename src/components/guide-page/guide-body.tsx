import React from "react";

type ParagraphBlock = { type: "paragraph"; text: string };
type HeadingBlock = { type: "heading"; level: number; text: string };
type ListBlock = { type: "list"; items: string[] };
type CodeBlock = { type: "code"; language: string; text: string };
type Block = ParagraphBlock | HeadingBlock | ListBlock | CodeBlock;

interface GuideBodyProps {
    body: unknown; // raw JSON from backend
}

function normalizeBody(raw: unknown): Block[] {
    if (!raw) return [];

    try {
        // If backend accidentally sends a string, parse it
        if (typeof raw === "string") {
            const parsed = JSON.parse(raw);
            if (parsed?.blocks) return parsed.blocks as Block[];
            return [{ type: "paragraph", text: raw }];
        }

        // Handle already-parsed object
        if (typeof raw === "object") {
            if ("blocks" in (raw as any)) {
                return (raw as any).blocks as Block[];
            }
        }
    } catch (err) {
        console.warn("Failed to parse guide body:", err);
        return [{ type: "paragraph", text: String(raw) }];
    }

    return [{ type: "paragraph", text: JSON.stringify(raw) }];
}

const GuideBody = ({ body }: GuideBodyProps) => {
    const blocks = normalizeBody(body);

    if (blocks.length === 0) {
        return (
            <p className="prose max-w-none text-gray-400 italic">
                No content available.
            </p>
        );
    }

    return (
        <div className="prose max-w-none">
            {blocks.map((block, idx) => {
                if (block.type === "heading") {
                    const Tag = `h${block.level}` as keyof React.JSX.IntrinsicElements;
                    return <Tag key={idx}>{block.text}</Tag>;
                }
                if (block.type === "list") {
                    return (
                        <ul key={idx} className="list-disc list-inside space-y-1">
                            {block.items.map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                            ))}
                        </ul>
                    );
                }
                if (block.type === "code") {
                    return (
                        <pre key={idx} className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                            <code className={`language-${block.language}`}>{block.text}</code>
                        </pre>
                    );
                }
                return <p key={idx}>{block.text}</p>;
            })}
        </div>
    );
};

export default GuideBody;