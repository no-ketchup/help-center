import { fetchGuidesByCategory } from "@/app/api/guides";
import { fetchCategoryBySlug } from "@/app/api/categories";
import { UserGuide } from "@/types/UserGuide";
import { Category } from "@/types/Category";

type Props = {
    params: { slug: string };
};

export default async function CategoryPage(props: Props) {
    const { slug } = await Promise.resolve(props.params); // Await the params

    try {
        // Fetch the category details
        const category: Category | null = await fetchCategoryBySlug(slug);

        if (!category) {
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Category not found</h2>
                    <p className="text-gray-500">Please check the URL and try again.</p>
                </div>
            );
        }

        // Fetch the guides in the category
        const guides: UserGuide[] = await fetchGuidesByCategory(slug);

        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    {category.name}{" "}
                    {guides.length > 0 &&
                        `(${guides.length} ${
                            guides.length === 1 ? "article included" : "articles included"
                        })`}
                </h2>
                <p className="text-gray-500">{category.description ?? "No description available for this category."}</p>

                <ul className="space-y-4">
                    {guides.map((guide: UserGuide) => (
                        <li key={guide.id}>
                            <a
                                href={`/user-guide/guide/${guide.slug}`}
                                className="text-blue-500 hover:underline"
                            >
                                {guide.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (error) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Error loading category</h2>
                <p className="text-gray-500">{errorMessage}</p>
            </div>
        );
    }
}