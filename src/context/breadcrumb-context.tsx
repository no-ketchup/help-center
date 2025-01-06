"use client";

import React, { createContext, useContext } from "react";

type BreadcrumbItem = {
    label: string;
    href: string;
};

type BreadcrumbContextType = {
    items?: BreadcrumbItem[];
    title: string;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
    undefined
);

export const BreadcrumbProvider = ({
                                       children,
                                       items = [],
                                       title = "",
                                   }: {
    children: React.ReactNode;
    items?: BreadcrumbItem[];
    title: string;
}) => {
    return (
        <BreadcrumbContext.Provider value={{ items, title }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error(
            "useBreadcrumb must be used within a BreadcrumbProvider."
        );
    }
    return context;
};