import React from "react";
import Image from "next/image";

interface GuideMediaProps {
    media: { url: string; title?: string; alt?: string }[];
}

const GuideMedia = ({ media }: GuideMediaProps) => {
    if (!media || media.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {media.map((item, index) => (
                <figure key={index} className="space-y-2">
                    <Image
                        src={item.url}
                        alt={item.alt || "Media"}
                        width={500}
                        height={300}
                        className="rounded"
                    />
                    {item.title && (
                        <figcaption className="text-sm text-gray-500 dark:text-gray-400">{item.title}</figcaption>
                    )}
                </figure>
            ))}
        </div>
    );
};

export default GuideMedia;