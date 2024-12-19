import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // Redirect users trying to access `/admin` without auth
    if (url.pathname === '/admin' && !req.cookies.has('auth')) {
        url.pathname = '/not-found';
        url.searchParams.set('code', '403');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Define paths to include in middleware processing
        '/admin',
    ],
};