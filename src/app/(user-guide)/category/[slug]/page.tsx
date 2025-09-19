import client from "@/lib/apiClient";
import { GET_CATEGORY } from "@/lib/queries";
import NotFoundCatchAll from "@/app/[...not_found]/page";
import { GetCategoryResponse } from "@/types/graphql";
import { handleError } from "@/utils/handleError";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    try {
        // Fetch category details (guides included directly)
        const { data } = await client.query<GetCategoryResponse>({
            query: GET_CATEGORY,
            variables: { slug },
        });

        const category = data?.category;
        if (!category) {
            return NotFoundCatchAll();
        }

        const guides = category.guides ?? [];

        return (
            <div className="space-y-6">
                {/* Category Title */}
                <h2 className="text-2xl font-bold">
                    {category.name}
                    {guides.length > 0 &&
                        ` (${guides.length} ${
                            guides.length === 1 ? "article included" : "articles included"
                        })`}
                </h2>

                {/* Category Description */}
                <p className="text-gray-500">
                    {category.description ??
                        "No description available for this category."}
                </p>

                {/* Guides List */}
                {guides.length > 0 ? (
                    <ul className="space-y-4">
                        {guides.map((guide) => (
                            <li key={guide.id}>
                                <a
                                    href={`/guide/${guide.slug}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {guide.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">
                        No guides in this category yet.
                    </p>
                )}
            </div>
        );
    } catch (err) {
        const error = handleError(err);
        console.error("Error in CategoryPage:", error.message);

        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Error loading category</h2>
                <p className="text-gray-500">{error.message}</p>
            </div>
        );
    }
}