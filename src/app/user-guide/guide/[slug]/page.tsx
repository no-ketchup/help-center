import { fetchGuideBySlug, fetchGuides } from "@/api/guides";
import GuideHeader from "@/components/guide-page/guide-header";
import GuideBody from "@/components/guide-page/guide-body";
import GuideMedia from "@/components/guide-page/guide-media";
import NotFoundCatchAll from "@/app/[...not_found]/page";
import { UserGuide } from "@/types/UserGuide";
import { Category } from "@/types/Category";
import {Media} from "@/types/Media";


type Params = {
    params: { slug: string };
};

export async function generateStaticParams() {
    const guides = await fetchGuides();
    return guides.map((guide: UserGuide) => ({
        slug: guide.slug,
    }));
}

export default async function GuidePage({ params }: Params) {
    const guide = await fetchGuideBySlug(params.slug);

    if (!guide) return NotFoundCatchAll();

    const {
        title = "Untitled",
        createdAt: createdDate = "",
        updatedAt: updatedDate = "",
        estimatedReadTime,
        body,
        categories = [],
        media = [],
    } = guide;

    const transformedCategories = categories.map((category: Category) => ({
        name: category.name ?? "Unnamed Category",
        slug: category.slug ?? "unknown-category",
    }));

    const transformedMedia = media.map((item: Media) => ({
        url: item.url ?? "",
        title: item.alt ?? "Untitled Media",
    }));

    return (
        <>
            <GuideHeader
                title={title}
                createdDate={createdDate}
                updatedDate={updatedDate}
                estimatedReadTime={estimatedReadTime}
                categories={transformedCategories}
            />
            <GuideBody body={body} />
            {transformedMedia.length > 0 && <GuideMedia media={transformedMedia} />}
        </>
    );
}