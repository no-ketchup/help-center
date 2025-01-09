import React from "react";

interface GuideBodyProps {
    body: {
        root: {
            children: Array<{
                children: Array<{
                    text: string;
                    type: string;
                }>;
                type: string;
            }>;
        };
    };
}

const GuideBody: React.FC<GuideBodyProps> = ({ body }) => {
    const renderBody = (body: GuideBodyProps["body"]) => {
        return body.root.children.map((child, index) => (
            <div key={index}>
                {child.children.map((node, nodeIndex) => (
                    <p key={nodeIndex} className="prose max-w-none">
                        {node.text}
                    </p>
                ))}
            </div>
        ));
    };

    return <div className="prose max-w-none">{renderBody(body)}</div>;
};

export default GuideBody;