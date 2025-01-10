import { useState, useEffect } from "react";
import { UserGuide } from "@/types/UserGuide";
import { fetchGuides } from "@/app/api/guides";
import { handleError } from "@/utils/handleError";

export function useGuides(): {
    guides: UserGuide[];
    loading: boolean;
    error: string | null;
} {
    const [guides, setGuides] = useState<UserGuide[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = await fetchGuides();
                if (isMounted) {
                    setGuides(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(handleError(err).message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { guides, loading, error };
}