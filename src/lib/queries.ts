import { gql } from "@apollo/client";

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