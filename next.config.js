/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"], // <-- and this,
    logging: 'verbose',
  },

  // and the following to enable top-level await support for Webpack
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  images: {
    domains: ["res.cloudinary.com",'picsum.photos','th.bing.com','127.0.0.1:8000','localhost'],
  },
};

module.exports = nextConfig;
