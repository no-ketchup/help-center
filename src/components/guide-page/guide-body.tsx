import React from "react";

type ParagraphBlock = { type: "paragraph"; text: string };
type HeadingBlock = { type: "heading"; level: number; text: string };
type Block = ParagraphBlock | HeadingBlock;

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
                return <p key={idx}>{block.text}</p>;
            })}
        </div>
    );
};

export default GuideBody;