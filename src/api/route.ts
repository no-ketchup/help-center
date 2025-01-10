import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.PAYLOAD_API_URL || '';
const API_KEY = process.env.PAYLOAD_API_KEY || '';

if (!BASE_URL || !API_KEY) {
    throw new Error('PAYLOAD_API_URL and PAYLOAD_API_KEY must be set in the environment variables');
}

// Centralized Payload Fetch
async function fetchFromPayload(
    endpoint: string,
    method: 'GET' | 'POST',
    body?: Record<string, unknown>,
    query?: string
) {
    const url = `${BASE_URL}/api/${endpoint}${query ? `?${query}` : ''}`;
    const options: RequestInit = {
        method,
        headers: {
            Authorization: `users API-Key ${API_KEY}`,
            'Content-Type': 'application/json',
        },
    };

    if (body && Object.keys(body).length > 0) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json();
        throw { message: errorData?.error || 'Failed to fetch from Payload API', status: response.status };
    }

    return response.json();
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const endpoint = searchParams.get('endpoint');
        const query = searchParams.get('query');

        if (!endpoint) {
            return NextResponse.json(
                { error: 'Endpoint is required' },
                { status: 400 }
            );
        }

        const data = await fetchFromPayload(endpoint, 'GET', undefined, query || '');
        return NextResponse.json(data);
    } catch (error: unknown) {
        const status = (error as any).status || 500;
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('GET Error:', error); // Logging for debugging
        return NextResponse.json({ error: message }, { status });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const endpoint = searchParams.get('endpoint');

        if (!endpoint) {
            return NextResponse.json(
                { error: 'Endpoint is required' },
                { status: 400 }
            );
        }

        const body = await req.json();
        const data = await fetchFromPayload(endpoint, 'POST', body);
        return NextResponse.json(data);
    } catch (error: unknown) {
        const status = (error as any).status || 500;
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('POST Error:', error); // Logging for debugging
        return NextResponse.json({ error: message }, { status });
    }
}