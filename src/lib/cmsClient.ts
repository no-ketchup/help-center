import { createClient } from 'contentful';

const client = typeof window === 'undefined'
    ? createClient({
        space: process.env.CONTENTFUL_SPACE_ID || '',
        accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || '',
        host: 'api.contentful.com',
    })
    : createClient({
        space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
        accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_ACCESS_TOKEN || '',
    });

export default client;