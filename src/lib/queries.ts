import {
    GetGuidesResponse,
    GetGuideResponse,
    GetCategoriesResponse,
    GetCategoryResponse,
    SubmitFeedbackResponse,
} from "@/types/graphql";
import { gql, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Apollo client with SSR disabled
const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    }),
    cache: new InMemoryCache(),
    ssrMode: false,
});

// -------------------------------
// Safe wrappers
// -------------------------------
async function safeQuery<T>(
    query: any,
    variables?: Record<string, any>
): Promise<{ data: T | null }> {
    if (process.env.NEXT_PHASE === "phase-production-build") {
        return { data: null };
    }
    const result = await client.query<T>({ query, variables });
    return { data: result.data ?? null };
}

async function safeMutate<T>(
    mutation: any,
    variables?: Record<string, any>
): Promise<{ data: T | null }> {
    if (process.env.NEXT_PHASE === "phase-production-build") {
        return { data: null };
    }
    const result = await client.mutate<T>({ mutation, variables });
    return { data: result.data ?? null };
}

// -------------------------------
// Guides
// -------------------------------
export const GET_GUIDES = gql`
    query {
        guides {
            id
            title
            slug
            estimatedReadTime
            createdAt
            updatedAt
        }
    }
`;

export async function getGuides() {
    const { data } = await safeQuery<GetGuidesResponse>(GET_GUIDES);
    return data?.guides ?? [];
}

export const GET_GUIDE = gql`
    query ($slug: String!) {
        guide(slug: $slug) {
            id
            title
            slug
            body
            estimatedReadTime
            createdAt
            updatedAt
            categories {
                id
                name
                slug
                description
            }
            media {
                id
                url
                alt
                createdAt
                updatedAt
            }
        }
    }
`;

export async function getGuide(slug: string) {
    const { data } = await safeQuery<GetGuideResponse>(GET_GUIDE, { slug });
    return data?.guide ?? null;
}

// -------------------------------
// Categories
// -------------------------------
export const GET_CATEGORIES = gql`
    query {
        categories {
            id
            name
            slug
            description
            createdAt
            updatedAt
        }
    }
`;

export async function getCategories() {
    const { data } = await safeQuery<GetCategoriesResponse>(GET_CATEGORIES);
    return data?.categories ?? [];
}

export const GET_CATEGORY = gql`
    query ($slug: String!) {
        category(slug: $slug) {
            id
            name
            slug
            description
            createdAt
            updatedAt
            guides {
                id
                title
                slug
                estimatedReadTime
                createdAt
                updatedAt
            }
        }
    }
`;

export async function getCategory(slug: string) {
    const { data } = await safeQuery<GetCategoryResponse>(GET_CATEGORY, { slug });
    return data?.category ?? null;
}

// -------------------------------
// Feedback
// -------------------------------
export const SUBMIT_FEEDBACK = gql`
    mutation (
        $name: String!
        $email: String!
        $message: String!
        $expectReply: Boolean!
    ) {
        submitFeedback(
            name: $name
            email: $email
            message: $message
            expectReply: $expectReply
        ) {
            id
            name
            email
            message
            expectReply
            createdAt
        }
    }
`;

export async function submitFeedback(input: {
    name: string;
    email: string;
    message: string;
    expectReply: boolean;
}) {
    const { data } = await safeMutate<SubmitFeedbackResponse>(
        SUBMIT_FEEDBACK,
        input
    );
    return data?.submitFeedback ?? null;
}