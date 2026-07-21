/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // Admin forms must keep working behind Netlify/Cloudflare host
      // forwarding — otherwise Next rejects the POST as cross-origin.
      allowedOrigins: [
        "mahinmahdi.com",
        "www.mahinmahdi.com",
        "*.netlify.app",
        "localhost:3000",
      ],
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow remote photography sources if Mahin later hosts images on a CDN.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
