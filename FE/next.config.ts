/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000/api/:path*" // Local environment
            : "http://backend:8000/api/:path*", // Docker environment
      },
    ];
  },
};

export default nextConfig;
