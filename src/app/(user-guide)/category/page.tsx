import { fetchCategories } from "@/api/categories";
import { Category } from "@/types/Category";

export default async function AllCategoriesPage() {
    try {
        // Fetch all categories
        const categories = await fetchCategories();

        return (
            <div className="p-6 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">All Categories</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Explore all available categories to find relevant guides and instructions.
                    </p>
                </div>

                {/* Categories Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {categories.map((category: Category) => (
                        <a
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="block p-5 border rounded-lg dark:border-zinc-700 hover:shadow-lg hover:border-zinc-400 dark:hover:border-zinc-500 transition-transform transform hover:scale-105"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {category.name}
                            </h2>
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                                {category.description || "No description available."}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error loading categories:", error);

        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold">Error</h2>
                <p className="text-gray-500">
                    Failed to load categories. Please try again later.
                </p>
            </div>
        );
    }
}