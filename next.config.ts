import type { NextConfig } from "next";

const nextConfig: NextConfig = {
        turbopack: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/categories',
    //             destination: '/api/proxy?endpoint=categories',
    //         },
    //         {
    //             source: '/api/guides',
    //             destination: '/api/proxy?endpoint=user-guides',
    //         },
    //         {
    //             source: '/api/feedback',
    //             destination: '/api/proxy?endpoint=feedback',
    //         },
    //     ];
    // },
};

export default nextConfig;
