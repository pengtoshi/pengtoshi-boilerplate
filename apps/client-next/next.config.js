/* eslint-disable spaced-comment */
const path = require("path");
const withNx = require("@nx/next/plugins/with-nx");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  swcMinify: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    isrMemoryCacheSize: 50,
    scrollRestoration: true,
  },
  webpack(config) {
    // NOTE: This is a workaround to allow SVGs to be imported as React components.
    const fileLoaderRule = config.module.rules.find((rule) => rule?.test?.test?.(".svg"));
    config.module.rules.push(
      // Keep default behavior when importing with ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // Use SVGR component transform for regular imports
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule?.issuer,
        resourceQuery: { not: [...(fileLoaderRule?.resourceQuery?.not ?? []), /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              exportType: "named",
              namedExport: "ReactComponent",
              icon: true,
              dimensions: false,
            },
          },
        ],
      },
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    return config;
  },
};

module.exports = withNx(nextConfig);
