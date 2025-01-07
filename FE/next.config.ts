/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NODE_ENV === "development" 
          ? "http://backend:8000/api/:path*"  // Docker environment
          : "http://localhost:8000/api/:path*" // Local environment
      },
    ];
  },
};

export default nextConfig;
