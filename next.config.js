const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const { i18n } = require("./next-i18next.config");
const withAntdLess = require("next-plugin-antd-less");
const withRuntimeDotenv = require("next-runtime-dotenv");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withENV = withRuntimeDotenv({
  public: [
    "SITE_URL",
    "API_URL",
    "FILE_SERVER",
    "APP_UUID_KEY",
    "LOCALE_DIRECTION_KEY",
    "KEY_TOKEN",
    "KEY_USER",
    "KEY_PWA_HINT",
    "KEY_WALLET_ACCOUNT",
    "DEFAULT_CHAIN_ID",
    "UPLOAD_API_URL",
    "BLOCK_EXPLORER",
    "BLOCKCHAIN_BSC",
    "NETWORK_NAME_BSC",
    "CHAIN_ID_BSC",
    "BLOCK_EXPLORER_BSC",
    "CURRENCY_BSC",
    "BLOCKCHAIN_POLYGON",
    "NETWORK_NAME_POLYGON",
    "CHAIN_ID_POLYGON",
    "BLOCK_EXPLORER_POLYGON",
    "CURRENCY_POLYGON"
  ],
});

const nextConfig = {
  // images: {
  //   formats: ["image/avif", "image/webp"],
  //   domains: ["storage.lendochain.io"],
  // },
  i18n,
  compiler: {
    styledComponents: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
  generateEtags: false,
  async rewrites() {
    return [
      {
        source: "/blog/category",
        destination: "/404",
      },
    ];
  },
};
module.exports = withENV(
  withPlugins(
    [
      [withBundleAnalyzer],
      [
        withPWA,
        {
          pwa: {
            disable: process.env.NODE_ENV === "development",
            register: true,
            skipWaiting: true,
            scope: "/",
            dest: "public",
            sw: "service-worker.js",
            runtimeCaching: [],
            buildExcludes: [
              /middleware-manifest\.json$/,
              /_middleware\.js$/,
              /_middleware\.js\.map$/,
              /middleware-runtime\.js$/,
              /server\/pages\/_middleware\.js$/,
            ],
          },
        },
      ],
      [
        withAntdLess,
        {
          lessVarsFilePath: "./antd/antd.less",
          lessVarsFilePathAppendToEndOfContent: true,
          cssLoaderOptions: {},
        },
      ],
    ],
    nextConfig
  )
);