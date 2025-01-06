"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import {ChevronRight} from "lucide-react";

export function DynamicBreadcrumb() {
    const { items } = useBreadcrumb();

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Render Breadcrumb Items */}
                {items?.map((item, index) => (
                    <React.Fragment key={item.label}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < items.length - 1 &&
                            <BreadcrumbSeparator>
                                <ChevronRight className="mx-0 w-4 h-4 text-gray-400" />
                            </BreadcrumbSeparator>
                        }
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}