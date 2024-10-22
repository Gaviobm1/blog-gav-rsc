/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode
  swcMinify: true, // Enables SWC-based minification
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-postsgavi.s3.eu-north-1.amazonaws.com",
        search: "",
      },
    ],
  },
};

export default nextConfig;
