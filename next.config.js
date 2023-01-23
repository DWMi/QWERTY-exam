/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["sans-serif"] } },
    ],
  },
};

module.exports = nextConfig;
