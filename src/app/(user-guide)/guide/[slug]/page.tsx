import client from "@/lib/apiClient";
import { GET_GUIDES, GET_GUIDE } from "@/lib/queries";
import GuideHeader from "@/components/guide-page/guide-header";
import GuideBody from "@/components/guide-page/guide-body";
import GuideMedia from "@/components/guide-page/guide-media";
import NotFoundCatchAll from "@/app/[...not_found]/page";
import { GetGuidesResponse, GetGuideResponse } from "@/types/graphql";

type Params = {
    params: Promise<{ slug: string }>;
};

// Generate static paths for guides
export async function generateStaticParams() {
    const { data } = await client.query<GetGuidesResponse>({
        query: GET_GUIDES,
    });

    return (data?.guides || []).map((guide) => ({
        slug: guide.slug,
    }));
}

export default async function GuidePage({ params }: Params) {
    const { slug } = await params;

    const { data } = await client.query<GetGuideResponse>({
        query: GET_GUIDE,
        variables: { slug },
    });

    const guide = data?.guide;
    if (!guide) return NotFoundCatchAll();

    return (
        <>
            <GuideHeader
                title={guide.title}
                createdDate={guide.createdAt}
                updatedDate={guide.updatedAt}
                estimatedReadTime={guide.estimatedReadTime}
                categories={guide.categories.map((c) => ({
                    name: c.name ?? "Unnamed Category",
                    slug: c.slug ?? "unknown-category",
                }))}
            />
            <GuideBody body={guide.body} />
            {guide.media.length > 0 && (
                <GuideMedia
                    media={guide.media.map((m) => ({
                        url: m.url ?? "",
                        title: m.alt ?? "Untitled Media",
                        alt: m.alt,
                    }))}
                />
            )}
        </>
    );
}