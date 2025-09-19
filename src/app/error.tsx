"use client";

import { useEffect } from "react";
import ErrorPage from "@/./components/error/error-page";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error("Global error:", error);
    }, [error]);

    return (
        <ErrorPage
            code={500}
            title="Something went wrong"
            subtitle={error.message || "An unexpected error occurred."}
            showIllustration={true}
        />
    );
}