import { handleError } from "@/utils/handleError";
import { fetchCategoryBySlug } from "@/api/categories";
import { fetchGuidesByCategory } from "@/api/guides";
import NotFoundCatchAll from "@/app/[...not_found]/page";
import { UserGuide } from "@/types/UserGuide";
import { Category } from "@/types/Category";

type Props = {
    params: Promise<{ slug: string }>; // Explicitly define params as a Promise
};


export default async function CategoryPage({ params }: Props) {
// Resolve params asynchronously to handle Next.js 15+ behavior
    const { slug } = await Promise.resolve(params);

    try {
        // Fetch the category details
        const category: Category | null = await fetchCategoryBySlug(slug);

        if (!category) {
            return NotFoundCatchAll();
        }

        // Fetch guides associated with the category
        const guides: UserGuide[] = await fetchGuidesByCategory(slug);

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
                    {category.description ?? "No description available for this category."}
                </p>

                {/* Guides List */}
                <ul className="space-y-4">
                    {guides.map((guide: UserGuide) => (
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
            </div>
        );
    } catch (err) {
        const error = handleError(err);
        console.error("Error in CategoryPage:", error.message);

        return (
            <div className="space-y-6">
                {/* Error Title */}
                <h2 className="text-2xl font-bold">Error loading category</h2>

                {/* Error Message */}
                <p className="text-gray-500">{error.message}</p>
            </div>
        );
    }
}