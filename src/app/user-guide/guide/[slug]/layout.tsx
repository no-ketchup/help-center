import { BackToTop } from "@/components/utilities/back-to-top";
import { DynamicBreadcrumb } from "@/components/navigation/dynamic-breadcrumb";
import { BreadcrumbProvider } from "@/context/breadcrumb-context";

export default function GuideLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto p-4">
            <BreadcrumbProvider>
            {/* Breadcrumb */}
            <DynamicBreadcrumb />

            {/* Main Content */}
            <main>{children}</main>

            {/* Back-to-Top Button */}
            <BackToTop />
            </BreadcrumbProvider>
        </div>
    );
}