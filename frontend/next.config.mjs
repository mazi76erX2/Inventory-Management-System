/** @type {import('next').NextConfig} */
const nextConfig = {
  source: "/api/:path*",
  destination: "http://localhost:8000/api/:path*",
};

export default nextConfig;
