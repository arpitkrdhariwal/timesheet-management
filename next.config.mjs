/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Netlify / serverless: do not use static export (we need API routes + auth)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
