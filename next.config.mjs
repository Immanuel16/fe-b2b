/** @type {import('next').NextConfig} */
// import dotenv from 'dotenv';

// dotenv.config({path: `./.env.${process.env.ENVIRONMENT || 'prod'}`});
// const env = {}

// Object.keys(process.env).forEach((key) => {
//   if(key.startsWith('NEXT_PUBLIC_')) {
//     env[key] = process.env[key];
//   }
// })

const nextConfig = {
  eslint:{
    ignoreDuringBuilds: true
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  rewrites: () => [
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_BASE_API || 'http://192.168.20.187:8000/api-internal/blicicil_business'}/:path*`,
    },
    {
      source: '/api-proxy/:path*',
      destination: `https://jsonplaceholder.typicode.com/:path*`,
    },

  ]
};

export default nextConfig;
