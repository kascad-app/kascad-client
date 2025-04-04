/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

nextConfig.images = {
  domains: ["cdn.pixabay.com", "images.unsplash.com"],
};

export default nextConfig;
