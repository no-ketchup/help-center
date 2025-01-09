import React from "react";

interface GuideHeaderProps {
    title: string;
    createdDate: string;
    updatedDate: string;
    estimatedReadTime?: number;
    categories?: { name: string; slug: string }[];
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const GuideHeader: React.FC<GuideHeaderProps> = ({
                                                     title,
                                                     createdDate,
                                                     updatedDate,
                                                     estimatedReadTime,
                                                     categories = [],
                                                 }) => {
    return (
        <header className="space-y-4">
            <h1 className="text-4xl font-bold">{title || "Untitled Guide"}</h1>
            <div className="text-sm text-gray-500 space-y-1">
                <p>
                    <strong>Created:</strong> {formatDate(createdDate)}
                </p>
                <p>
                    <strong>Updated:</strong> {formatDate(updatedDate)}
                </p>
                {estimatedReadTime && (
                    <p>
                        <strong>Read Time:</strong> {estimatedReadTime} mins
                    </p>
                )}
            </div>
            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <span
                            key={category.slug}
                            className="px-2 py-1 bg-gray-200 rounded text-sm text-gray-700"
                            aria-label={`Category: ${category.name}`}
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
            )}
        </header>
    );
};

export default GuideHeader;