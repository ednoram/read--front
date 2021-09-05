/* eslint-disable no-undef */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  sassOptions: {
    prependData:
      ["variables", "breakpoints", "animations"]
        .map((fileName) => `@import "@styles/${fileName}.scss";`)
        .join("\n") + "\n\n",
  },
  env: {
    APOLLO_URI: process.env.APOLLO_URI,
  },
};
