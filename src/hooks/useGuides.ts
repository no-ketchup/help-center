import { useState, useEffect } from "react";
import { UserGuide } from "@/types/UserGuide";
import { fetchGuides } from "@/api/guides";

export function useGuides(): {
    guides: UserGuide[];
    loading: boolean;
    error: Error | null;
} {
    const [guides, setGuides] = useState<UserGuide[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const data: UserGuide[] = await fetchGuides();
                setGuides(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("An unknown error occurred."));
                }
            } finally {
                setLoading(false);
            }
        };

        void fetchData(); // Explicitly mark the Promise as intentionally unhandled
    }, []);

    return { guides, loading, error };
}