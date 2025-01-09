import React from "react";

const CategoryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="category-layout">
            <main className="p-6">{children}</main>
        </div>
    );
};

export default CategoryLayout;