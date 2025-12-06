/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NEXT_PUBLIC_BASE_PATH ||
    (process.env.NODE_ENV === "production" ? "/introduce" : ""),
  assetPrefix:
    process.env.NEXT_PUBLIC_BASE_PATH ||
    (process.env.NODE_ENV === "production" ? "/introduce" : ""),
};

module.exports = nextConfig;


