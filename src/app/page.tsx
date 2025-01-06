import HelpCenterSearch from "../components/launch/help-center-search";
import QuickLinks from "../components/launch/quick-links-section";

export default function LaunchPage() {
    return (
        <div className="mx-auto w-full max-w-6xl pt-40 px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
            {/* Title and Search Section */}
            <section className="flex flex-col gap-y-6">
                <div className="text-left w-full">
                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl py-4 md:text-6xl font-medium tracking-tight">
                        How can we be of assistance today?
                    </h1>
                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-600">
                        Search for solutions or articles…
                    </p>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-2xl">
                    <HelpCenterSearch />
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="pt-6">
                <QuickLinks />
            </section>
        </div>
    );
}