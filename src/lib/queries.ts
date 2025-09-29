import { gql } from "@apollo/client";
import client from "@/lib/apiClient";

import {
    GetGuidesResponse,
    GetGuideResponse,
    GetCategoriesResponse,
    GetCategoryResponse,
    SubmitFeedbackResponse,
} from "@/types/graphql";

// -------------------------------
// Generic helpers
// -------------------------------
async function runQuery<T>(
    query: any,
    variables?: Record<string, any>
): Promise<T | null> {
    try {
        const result = await client.query<T>({ query, variables });
        return result.data ?? null;
    } catch (err) {
        console.error("GraphQL query failed:", err);
        return null;
    }
}

async function runMutation<T>(
    mutation: any,
    variables?: Record<string, any>
): Promise<T | null> {
    try {
        const result = await client.mutate<T>({ mutation, variables });
        return result.data ?? null;
    } catch (err) {
        console.error("GraphQL mutation failed:", err);
        return null;
    }
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
    const data = await runQuery<GetGuidesResponse>(GET_GUIDES);
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
    const data = await runQuery<GetGuideResponse>(GET_GUIDE, { slug });
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
    const data = await runQuery<GetCategoriesResponse>(GET_CATEGORIES);
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
    const data = await runQuery<GetCategoryResponse>(GET_CATEGORY, { slug });
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
    const data = await runMutation<SubmitFeedbackResponse>(SUBMIT_FEEDBACK, input);
    return data?.submitFeedback ?? null;
}